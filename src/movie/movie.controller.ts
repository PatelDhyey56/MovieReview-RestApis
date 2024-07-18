import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from 'src/database/entity/movie.entity';
import { CreaeMovieWithArtistDto } from './dto/create-movieWithArtist.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMoviePhoto } from './dto/create-movieWithPhoto.dto';
import { Photo } from 'src/database/entity/photo.entity';
import { UserRole } from 'src/database/entity/user.entity';
import { RolePermissinGuard } from 'src/auth/role-permissin/role-permissin.guard';
import { Roles } from 'src/auth/role-permissin/role-permissin.decorator';

@ApiTags('Movie')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateMovieDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateMovieDto,
  })
  @Roles(UserRole.Admin, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreateMovieDto,
    isArray: true,
  })
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateMovieDto,
  })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateMovieDto })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateResult> {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: DeleteResult,
  })
  @Roles(UserRole.Admin, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.movieService.remove(+id);
  }

  @Post('/artists')
  @ApiBody({ type: CreaeMovieWithArtistDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreaeMovieWithArtistDto,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  createArtistMovie(
    @Body() createMovieArtistWithMovieDto: CreaeMovieWithArtistDto,
  ): Promise<Movie> {
    return this.movieService.MoviewithArtist(createMovieArtistWithMovieDto);
  }

  @Post('/photos')
  @ApiBody({ type: CreateMoviePhoto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateMoviePhoto,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  moviewithPhoto(
    @Body() createMoviePhoto: CreateMoviePhoto,
  ): Promise<{ message: string }> {
    return this.movieService.MoviewithPhoto(createMoviePhoto);
  }

  @Get('/photos/:id')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: true,
    type: Photo,
  })
  moviewithPhotos(@Param('id') id: string): Promise<Photo[]> {
    return this.movieService.MoviewithPhotos(+id);
  }
}

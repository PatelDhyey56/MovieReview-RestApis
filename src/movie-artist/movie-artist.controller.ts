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
import { MovieArtistService } from './movie-artist.service';
import { CreateMovieArtistDto } from './dto/create-movie-artist.dto';
import { UpdateMovieArtistDto } from './dto/update-movie-artist.dto';
import { MovieArtist } from 'src/database/entity/movieArtist.entity';
import { CreateArtistWithMovieDto } from './dto/create-artistWithMovie.dto';
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
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateArtistPhoto } from './dto/artistWithPhoto.dto';
import { Photo } from 'src/database/entity/photo.entity';
import { Roles } from 'src/auth/role-permissin/role-permissin.decorator';
import { UserRole } from 'src/database/entity/user.entity';
import { RolePermissinGuard } from 'src/auth/role-permissin/role-permissin.guard';

@ApiTags('Artist')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('movieArtist')
export class MovieArtistController {
  constructor(private readonly movieArtistService: MovieArtistService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateMovieArtistDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateMovieArtistDto,
  })
  @Roles(UserRole.Admin, UserRole.Actor)
  @UseGuards(RolePermissinGuard)
  create(
    @Body() createMovieArtistDto: CreateMovieArtistDto,
  ): Promise<MovieArtist> {
    return this.movieArtistService.create(createMovieArtistDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreateMovieArtistDto,
    isArray: true,
  })
  findAll(): Promise<MovieArtist[]> {
    return this.movieArtistService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateMovieArtistDto,
  })
  findOne(@Param('id') id: string): Promise<MovieArtist> {
    return this.movieArtistService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateMovieArtistDto })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Actor)
  @UseGuards(RolePermissinGuard)
  update(
    @Param('id') id: string,
    @Body() updateMovieArtistDto: UpdateMovieArtistDto,
  ): Promise<UpdateResult> {
    return this.movieArtistService.update(+id, updateMovieArtistDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Actor)
  @UseGuards(RolePermissinGuard)
  @Roles(UserRole.Admin, UserRole.Actor)
  @UseGuards(RolePermissinGuard)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.movieArtistService.remove(+id);
  }

  @Post('/movies')
  @ApiBody({ type: CreateArtistWithMovieDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateArtistWithMovieDto,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  createArtistMovie(
    @Body() createMovieArtistWithMovieDto: CreateArtistWithMovieDto,
  ): Promise<{ message: string }> {
    return this.movieArtistService.ArtistWithMovie(
      createMovieArtistWithMovieDto,
    );
  }

  @Post('/photos')
  @ApiBody({ type: CreateArtistPhoto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateArtistPhoto,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  moviewithPhoto(
    @Body() createArtistPhoto: CreateArtistPhoto,
  ): Promise<{ message: string }> {
    return this.movieArtistService.ArtistwithPhoto(createArtistPhoto);
  }

  @Get('/photos/:id')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: true,
    type: Photo,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  moviewithPhotos(@Param('id') id: string): Promise<Photo[]> {
    return this.movieArtistService.ArtistwithPhotos(+id);
  }
}

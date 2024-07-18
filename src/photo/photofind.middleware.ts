import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MovieService } from 'src/movie/movie.service';
import { MovieArtistService } from 'src/movie-artist/movie-artist.service';
import { UserService } from 'src/user/user.service';
import { PhotoType } from 'src/database/entity/photo.entity';

@Injectable()
export class photofindMiddleware implements NestMiddleware {
  constructor(
    private movieService: MovieService,
    private movieArtistService: MovieArtistService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.body.PhotoType === PhotoType.Movie
      ? await this.movieService.findOne(req.body.photoId)
      : req.body.PhotoType === PhotoType.MovieArtist
        ? await this.movieArtistService.findOne(req.body.photoId)
        : await this.userService.findOne(req.body.photoId);
    next();
  }
}

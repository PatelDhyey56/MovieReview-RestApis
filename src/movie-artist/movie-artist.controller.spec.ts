import { Test, TestingModule } from '@nestjs/testing';
import { MovieArtistController } from './movie-artist.controller';
import { MovieArtistService } from './movie-artist.service';

describe('MovieArtistController', () => {
  let controller: MovieArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieArtistController],
      providers: [MovieArtistService],
    }).compile();

    controller = module.get<MovieArtistController>(MovieArtistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MovieArtistService } from './movie-artist.service';

describe('MovieArtistService', () => {
  let service: MovieArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieArtistService],
    }).compile();

    service = module.get<MovieArtistService>(MovieArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TaggedService } from './tagged.service';

describe('TaggedService', () => {
  let service: TaggedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaggedService],
    }).compile();

    service = module.get<TaggedService>(TaggedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

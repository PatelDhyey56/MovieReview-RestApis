import { Test, TestingModule } from '@nestjs/testing';
import { TaggedController } from './tagged.controller';
import { TaggedService } from './tagged.service';

describe('TaggedController', () => {
  let controller: TaggedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaggedController],
      providers: [TaggedService],
    }).compile();

    controller = module.get<TaggedController>(TaggedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

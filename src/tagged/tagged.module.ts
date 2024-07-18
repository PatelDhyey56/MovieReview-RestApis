import { Module } from '@nestjs/common';
import { TaggedService } from './tagged.service';
import { TaggedController } from './tagged.controller';
import { Tagged } from 'src/database/entity/tagged.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tagged])],
  controllers: [TaggedController],
  providers: [TaggedService],
})
export class TaggedModule {}

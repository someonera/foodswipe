import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = this.tagRepository.create();
    newTag.title = createTagDto.title;
    try {
      await newTag.save();
      return newTag;
    } catch (error) {
      if (error.code === '23505') {
        // title already exists
        throw new ConflictException('Tag already exists');
      }
      throw new InternalServerErrorException('Internal Server error');
    }
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.tagRepository.find();
    return tags;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    // TODO: Will be an Protected Admin Only route
    const tagUpdated = await this.tagRepository.findOne({ id });
    tagUpdated.title = updateTagDto.title;
    try {
      await tagUpdated.save();
      return tagUpdated;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server error');
    }
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.tagRepository.delete({ id });
    if (affected === 0) throw new NotFoundException(`No Tag with id: ${id}`);
  }
}

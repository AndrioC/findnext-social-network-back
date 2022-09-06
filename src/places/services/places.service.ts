import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from '../dtos/create-place.dto';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(Place) private repo: Repository<Place>) {}

  create(placeDto: CreatePlaceDto) {
    const place = this.repo.create(placeDto);

    return this.repo.save(place);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.find({ where: { id } });
  }

  async update(id: number, attrs: Partial<Place>) {
    const place = await this.findOne(id);

    if (!place) {
      throw new NotFoundException('place not found!');
    }

    Object.assign(place, attrs);
    return this.repo.save(place);
  }

  async remove(id: number) {
    const place = await this.findOne(id);

    if (!place) {
      throw new NotFoundException('place not found!');
    }

    return this.repo.remove(place);
  }
}

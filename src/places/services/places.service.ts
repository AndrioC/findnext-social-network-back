import { Injectable, NotFoundException } from '@nestjs/common';
import RepoService from '../../repo.service';
import { CreatePlaceDto } from '../dtos/create-place.dto';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(private readonly repoService: RepoService) {}

  create(placeDto: CreatePlaceDto) {
    const place = this.repoService.placeRepo.create(placeDto);

    return this.repoService.placeRepo.save(place);
  }

  async findAll() {
    return await this.repoService.placeRepo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repoService.placeRepo.find({ where: { id } });
  }

  async update(id: number, attrs: Partial<Place>) {
    const place = await this.findOne(id);

    if (!place) {
      throw new NotFoundException('place not found!');
    }

    Object.assign(place, attrs);
    return this.repoService.placeRepo.save(place);
  }

  async remove(id: number) {
    const place = await this.findOne(id);

    if (!place) {
      throw new NotFoundException('place not found!');
    }

    return this.repoService.placeRepo.remove(place);
  }

  async findUser(id: number) {
    if (!id) {
      return null;
    }
    return this.repoService.userRepo.findOne({ where: { id } });
  }
}

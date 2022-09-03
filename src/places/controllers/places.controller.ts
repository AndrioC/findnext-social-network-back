import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlaceDto } from '../dtos/create-place.dto';
import { PlacesService } from '../services/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
  createPlace(@Body() body: CreatePlaceDto) {
    return this.placesService.create(body);
  }

  @Get()
  getAll() {
    return this.placesService.findAll();
  }
}

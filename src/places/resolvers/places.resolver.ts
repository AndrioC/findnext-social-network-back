import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { CreatePlaceInput } from '../dtos/create-place-input.dto';
import { CreatePlaceResponse } from '../dtos/create-place-response.dto';
import { Place } from '../entities/place.entity';
import { PlacesService } from '../services/places.service';

@Resolver()
export class PlacesResolver {
  constructor(private placesService: PlacesService) {}

  @Mutation(() => CreatePlaceResponse)
  @UseGuards(JwtAuthGuard)
  createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
    @CurrentUser() user: User,
  ) {
    return this.placesService.create({ ...createPlaceInput, user });
  }

  @Query(() => [Place])
  @UseGuards(JwtAuthGuard)
  listAllPlaces() {
    return this.placesService.findAll();
  }
}

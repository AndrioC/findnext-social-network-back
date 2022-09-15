import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { User } from '../../users/entities/user.entity';
import { CreatePlaceInput } from '../dtos/create-place-input.dto';
import { CreatePlaceResponse } from '../dtos/create-place-response.dto';
import { Place } from '../entities/place.entity';
import { PlacesService } from '../services/places.service';

@Resolver(() => Place)
@UseGuards(JwtAuthGuard)
export class PlacesResolver {
  constructor(private placesService: PlacesService) {}

  @Mutation(() => CreatePlaceResponse)
  async createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
  ) {
    const { createReadStream, filename } = await createPlaceInput.image;

    const user = await this.placesService.findUser(createPlaceInput.userId);

    new Promise(async (resolve) =>
      createReadStream()
        .pipe(createWriteStream(`./src/uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        }),
    );

    const created = await this.placesService.create({
      ...createPlaceInput,
      image: filename,
    });

    return { ...created, user };
  }

  @Query(() => [Place])
  listAllPlaces() {
    return this.placesService.findAll();
  }

  @ResolveField(() => User)
  public async userName(@Parent() parent: Place): Promise<User> {
    return await this.placesService.findUser(parent.userId);
  }
}

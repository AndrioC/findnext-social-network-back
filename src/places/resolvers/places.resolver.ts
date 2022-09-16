import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { S3Service } from '../../s3/services/s3.service';
import { User } from '../../users/entities/user.entity';
import { CreatePlaceInput } from '../dtos/create-place-input.dto';
import { CreatePlaceResponse } from '../dtos/create-place-response.dto';
import { Place } from '../entities/place.entity';
import { PlacesService } from '../services/places.service';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Place)
@UseGuards(JwtAuthGuard)
export class PlacesResolver {
  constructor(
    private placesService: PlacesService,
    private s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  @Mutation(() => CreatePlaceResponse)
  async createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
  ) {
    const { createReadStream, mimetype } = await createPlaceInput.image;

    const user = await this.placesService.findUser(createPlaceInput.userId);
    const bucketName = this.configService.get<string>('POST_IMAGES');

    const hashFilename = `${uuidv4()}-img`;

    const params = {
      Bucket: bucketName,
      Key: hashFilename,
      Body: createReadStream(),
      ContentType: mimetype,
    };

    await this.s3Service.uploadFile({ params });

    const created = await this.placesService.create({
      ...createPlaceInput,
      image: hashFilename,
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

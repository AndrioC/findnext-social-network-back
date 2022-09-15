import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './services/places.service';
import { Place } from './entities/place.entity';
import { PlacesResolver } from './resolvers/places.resolver';
import { UploadImageResolver } from './resolvers/upload-image.resolver';
import { User } from '../users/entities/user.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Place, User])],
  providers: [PlacesService, PlacesResolver, UploadImageResolver],
  exports: [PlacesService],
})
export class PlacesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './services/places.service';
import { PlacesController } from './controllers/places.controller';
import { Place } from './entities/place.entity';
import { PlacesResolver } from './resolvers/places.resolver';
import { UploadImageResolver } from './resolvers/upload-image.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesResolver, UploadImageResolver],
})
export class PlacesModule {}

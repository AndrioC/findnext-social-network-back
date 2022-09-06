import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './services/places.service';
import { PlacesController } from './controllers/places.controller';
import { Place } from './entities/place.entity';
import { PlacesResolver } from './resolvers/places.resolver';
import { UploadImageResolver } from './resolvers/upload-image.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), UsersModule],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesResolver, UploadImageResolver],
  exports: [PlacesService],
})
export class PlacesModule {}

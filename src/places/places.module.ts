import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './services/places.service';
import { Place } from './entities/place.entity';
import { PlacesResolver } from './resolvers/places.resolver';
import { UploadImageResolver } from './resolvers/upload-image.resolver';
import { User } from '../users/entities/user.entity';
import { S3Service } from '../s3/services/s3.service';
import { S3Module } from '../s3/s3.module';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Place, User]), S3Module],
  providers: [PlacesService, PlacesResolver, UploadImageResolver, S3Service],
  exports: [PlacesService],
})
export class PlacesModule {}

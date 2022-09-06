import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { PlacesModule } from '../places/places.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PlacesModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}

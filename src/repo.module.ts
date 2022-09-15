import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './places/entities/place.entity';
import RepoService from './repo.service';
import { User } from './users/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Place])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;

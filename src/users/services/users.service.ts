import { Injectable, NotFoundException } from '@nestjs/common';
import RepoService from '../../repo.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repoService: RepoService) {}

  create(email: string, name: string, password: string) {
    const user = this.repoService.userRepo.create({ email, name, password });

    return this.repoService.userRepo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repoService.userRepo.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repoService.userRepo.find({ where: { email } });
  }

  findAll() {
    return this.repoService.userRepo.find();
  }

  async update(id: number, attrs: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, attrs);
    return this.repoService.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return this.repoService.userRepo.remove(user);
  }
}

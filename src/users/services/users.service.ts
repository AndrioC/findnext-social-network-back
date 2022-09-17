import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import RepoService from '../../repo.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt);

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

    if (attrs.password) {
      const salt = randomBytes(8).toString('hex');

      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;

      const result = salt + '.' + hash.toString('hex');

      attrs.password = result;
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Get('list-all')
  listAll() {
    return this.usersService.findAll();
  }
}

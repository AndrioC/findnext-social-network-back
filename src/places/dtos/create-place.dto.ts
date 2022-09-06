import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePlaceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  user: User;
}

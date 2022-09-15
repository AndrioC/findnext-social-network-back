import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePlaceDto {
  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  image: string;

  user: User;
}

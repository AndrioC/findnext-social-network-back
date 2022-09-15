import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  avatar_image: string;

  @IsString()
  background_image: string;

  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsNumber()
  userId: number;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  image: string;
}

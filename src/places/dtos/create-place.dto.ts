import { IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

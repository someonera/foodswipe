import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  // TODO: strong password regex Match(REGEX)
  password: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}

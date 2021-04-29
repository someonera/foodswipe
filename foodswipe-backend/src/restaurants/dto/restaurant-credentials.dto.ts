import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RestaurantCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  password;
}

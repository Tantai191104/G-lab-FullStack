import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  address: string[];
}

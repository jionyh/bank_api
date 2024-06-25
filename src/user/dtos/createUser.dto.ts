import { IsEmail, IsString, MinLength } from 'class-validator';
import {Transform} from 'class-transformer'
import { ToLowerCase } from 'src/decorators/to-lower-case.decorator';

export class CreateUserDto {
  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

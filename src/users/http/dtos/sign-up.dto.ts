import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { faker } from '@faker-js/faker';
const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g);

export class SignUpDto {
  @ApiProperty({
    type: String,
    minLength: 2,
    example: faker.name.firstName(),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    type: String,
    minLength: 2,
    example: faker.name.lastName(),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    type: String,
    example: faker.internet.email().toLowerCase(),
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: faker.internet.password(8, true, passwordRegex),
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, {
    message:
      'Password must be 6 characters minumum, contains at least one character and one number',
  })
  password: string;
}

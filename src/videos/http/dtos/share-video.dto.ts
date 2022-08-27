import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShareVideoDto {
  @ApiProperty({
    type: String,
    example: faker.internet.url(),
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

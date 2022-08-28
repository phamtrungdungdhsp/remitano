import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: false,
    example: 1,
  })
  @Transform((t) => +t.value)
  @IsOptional()
  @IsInt()
  @IsPositive()
  page = 1;

  @ApiProperty({
    type: Number,
    required: false,
    example: 10,
  })
  @Transform((t) => +t.value)
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit = 10;
}

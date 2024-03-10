import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryPriorityURLDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;
}

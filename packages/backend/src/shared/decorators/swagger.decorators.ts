import { Column, ColumnOptions } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiColumn(description: string, columnOptions?: ColumnOptions) {
  return applyDecorators(ApiProperty({ description }), Column(columnOptions));
}

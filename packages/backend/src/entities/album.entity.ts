import { Entity } from 'typeorm';
import { ApiColumn } from '../shared/decorators';
import { EnhancedBaseEntity } from './enhanced-base.entity';

@Entity({ name: 'albums' })
export class Album extends EnhancedBaseEntity {
  @ApiColumn('name')
  name?: string;

  @ApiColumn('artist')
  artist?: string;
}

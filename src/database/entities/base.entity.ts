import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BOOLEAN_NUMBER } from 'src/shared/business/constant';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @Column()
  @Type(() => Date)
  @IsDate()
  public create_date?: Date;

  @Column()
  @Type(() => Date)
  @IsDate()
  public modify_date?: Date;

  @Column()
  @Expose()
  @IsEnum(BOOLEAN_NUMBER)
  public del: BOOLEAN_NUMBER = BOOLEAN_NUMBER.NO;

  @BeforeInsert()
  protected generateDateBeforeInsert(): void {
    this.create_date = new Date();
    this.modify_date = this.create_date;
  }

  @BeforeUpdate()
  protected generateDateBeforeUpdate(): void {
    this.modify_date = new Date();
  }
}

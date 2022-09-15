import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Place } from '../../places/entities/place.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field()
  avatar_image: string;

  @Column({ nullable: true })
  @Field()
  background_image: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @OneToMany(() => Place, (place) => place.userRelation)
  placeRelation: Promise<Place[]>;
}

import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Place {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  image: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
  })
  @Field({ nullable: false })
  user: User;
}

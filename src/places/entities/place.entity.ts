import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  user: Promise<User>;

  @ManyToOne(() => User, (user) => user.placeRelation, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  userRelation: Promise<User>;
}

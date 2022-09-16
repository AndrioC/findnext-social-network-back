import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
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

  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  user: Promise<User>;

  @ManyToOne(() => User, (user) => user.placeRelation, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  userRelation: Promise<User>;

  @Field()
  @Expose()
  url_image: string;

  @AfterLoad()
  generateImageUrl() {
    this.url_image = `https://${process.env.POST_IMAGES}.s3.us-east-1.amazonaws.com/${this.image}`;
  }
}

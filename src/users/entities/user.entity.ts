import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {
  AfterLoad,
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

  @Column()
  @Field()
  avatar_image: string;

  @Column()
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

  @Field()
  @Expose()
  url_avatar_image: string;

  @Field()
  @Expose()
  url_background_image: string;

  @AfterLoad()
  generateImageUrl() {
    this.url_avatar_image = this.avatar_image
      ? `https://${process.env.USER_IMAGES}.s3.us-east-1.amazonaws.com/${this.avatar_image}`
      : null;
    this.url_background_image = this.background_image
      ? `https://${process.env.USER_IMAGES}.s3.us-east-1.amazonaws.com/${this.background_image}`
      : null;
  }
}

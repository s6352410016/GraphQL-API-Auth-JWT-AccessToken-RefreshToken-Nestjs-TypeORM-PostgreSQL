import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column("varchar")
    @Field()
    fullname: string;

    @Column("varchar")
    @Field()
    username: string;

    @Column("varchar")
    @Field()
    password: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;
}
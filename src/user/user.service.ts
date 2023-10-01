import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'entities/user.entity';
import { SignUpDto } from 'src/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async findWithUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                username
            }
        });
    }

    async signUp(signUpDto: SignUpDto): Promise<UserEntity> {
        const { fullname, username, password } = signUpDto;
        const passwordHash = await bcrypt.hash(password, 10);
        const userData = this.userRepository.create({
            fullname,
            username,
            password: passwordHash
        });
        return await this.userRepository.save(userData);
    }
}

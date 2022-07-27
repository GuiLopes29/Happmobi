import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  private encodeToken(userData: User) {
    return this.jwtService.sign(userData);
  }

  public validateToken(token: string) {
    if (token) {
      return this.jwtService.verify(token);
    } else {
      return 'Invalid token'
    }
  }

  public async find(login: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { login } });
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const token = this.encodeToken({ ...user })
        return { token: token };
      } else {
        throw new BadRequestException('Wrong credentials, check your login and password');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user) {
        return user;
      } else {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

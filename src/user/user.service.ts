import { BadRequestException, Injectable } from '@nestjs/common';
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

  //GENERATE A TOKEN
  private encodeToken(userData: User) {
    return this.jwtService.sign(userData);
  }

  //CHECK IF THE TOKEN IS VALID
  public validateToken(token: string) {
    if (token) {
      return this.jwtService.verify(token);
    } else {
      return 'Invalid token'
    }
  }

  //SEARCH FOR A USER BY LOGIN TO SIGN IN
  public async find(login: string, password: string) {
    try {
      //GET THE USER INFORMED BY THE LOGIN
      const user = await this.userRepository.findOne({ where: { login } });
      if (user) {
        //CHECK IF THE PASSWORD IS THE SAME AS THE PASSWORD IN THE DB
        const pass = await bcrypt.compare(password, user.password);
        if (pass) {
          //IF THE PASSWORD IS THE SAME, GENERATE A TOKEN AND RETURN TO USER
          const token = this.encodeToken({ ...user })
          return { token: token };
        } else {
          throw new BadRequestException('Wrong credentials, check your login and password');
        }
      } else {
        throw new BadRequestException('Wrong credentials, check your login and password');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //SEARCH FOR A USER BY ID TO GET INFORMATION
  public async findOne(id: number) {
    try {
      //GET THE USER INFORMED BY THE ID
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

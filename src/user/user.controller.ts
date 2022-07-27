import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post() async find(@Body() body: any) {
    return await this.userService.find(body.login, body.password);
  }
}

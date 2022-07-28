import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUser } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: 'Login successful.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  @ApiBody({ type: LoginUser, description: 'Credencials to login.' })
  @Post() async find(@Body() body: any) {
    return await this.userService.find(body.login, body.password);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    return this.userService.validateToken(token);
  }
}

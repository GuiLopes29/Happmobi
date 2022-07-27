import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmService } from './typeorm.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user/user.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    VehicleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmService, { provide: APP_GUARD, useClass: UserGuard }],
})
export class AppModule { }

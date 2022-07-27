import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    constructor(private config: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: this.config.get('DB_HOST'),
            port: +this.config.get<number>('DB_PORT'),
            username: this.config.get('DB_USER'),
            password: this.config.get('DB_PASSWORD'),
            database: this.config.get('DB_DATABASE'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
            options: { encrypt: false },
            logging: ['error'],
        }
    }
}
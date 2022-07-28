import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("Users") export class User {

    @ApiProperty({
        example: 1,
        description: 'User ID'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Albert Einstein',
        description: 'User login'
    })
    @Column()
    name: string;

    @ApiProperty({
        example: 'admin',
        description: 'User login'
    })
    @Column({ unique: true })
    login: string;

    @ApiProperty({
        example: '1a2b3c4d5e6f',
        description: 'User password'
    })
    @Column()
    password: string;

    @ApiProperty({
        example: '2020-01-01T00:00:00.000Z',
        description: 'User creation date'
    })
    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Vehicle, (vehicle) => vehicle.booker, {
        cascade: false,
        eager: false,
        nullable: true
    })
    vehicle: Vehicle;
}

export class LoginUser {
    @ApiProperty({
        example: 'admin',
        description: 'User login'
    })
    login: string;

    @ApiProperty({
        example: '1a2b3c4d5e6f',
        description: 'User password'
    })
    password: string;
}
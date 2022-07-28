import { User } from "src/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"

@Entity("Vehicle") export class Vehicle {
    @ApiProperty({
        example: 'BAC-0741',
        description: 'Vehicle ID'
    })
    @ApiProperty()
    @PrimaryColumn()
    licensePlate: string;

    @ApiProperty({
        example: true,
        description: 'Declare if vehicle is available'
    })
    @ApiProperty()
    @Column()
    reserved: boolean;

    @ApiProperty({
        example: 'BMW X5',
        description: 'Vehicle model'
    })
    @ApiProperty()
    @Column()
    model: string;

    @ApiProperty({
        example: 'BMW',
        description: 'Vehicle brand'
    })
    @ApiProperty()
    @Column()
    brand: string;


    @OneToOne(() => User, (user) => user.vehicle, {
        cascade: false,
        eager: false,
        nullable: true
    })
    @JoinColumn()
    booker: User;
}
export class UpdateVehicle {
    @ApiProperty({
        example: 'BAC-0741',
        description: 'Vehicle license plate'
    })
    licensePlate: string;

    @ApiProperty({
        example: true,
        description: 'Declare if vehicle is available, if false, vehicle can be reserved.'
    })
    reserved: boolean;

    @ApiProperty({
        example: 1,
        description: 'User ID'
    })
    id: number;
}
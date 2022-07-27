import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"

@Entity("Vehicle") export class Vehicle {
    @PrimaryColumn()
    licensePlate: string;

    @Column()
    reserved: boolean;

    @Column()
    model: string;

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
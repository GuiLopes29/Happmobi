import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("Users") export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    login: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Vehicle, (vehicle) => vehicle.booker, {
        cascade: false,
        eager: false,
        nullable: true
    }) vehicle: Vehicle;
}
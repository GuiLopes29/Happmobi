import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  //RESERVE A VEHICLE OR UNRESERVE A VEHICLE
  public async update(body: any) {
    try {
      //GET THE VEHICLE INFORMED BY THE LICENSE PLATE
      const vehicle = await this.vehicleRepository.findOne({ where: { licensePlate: body.licensePlate } });
      if (vehicle) {
        vehicle.reserved = body.reserved;

        //GET THE USER INFORMED BY THE ID IN THE BODY
        const user = await this.userRepository.findOne({ where: { id: body.id } })
        if (user) {
          //IF THE USER IS FOUND, CHECK IF THE USER ALREADY HAVE A VEHICLE
          const Booked = await this.vehicleRepository.findOne({ where: { booker: body.id } });
          if (!Booked || !body.reserved) {
            if (body.reserved) {
              vehicle.booker = user;
            } else {
              vehicle.booker = null;
            }
          } else {
            throw new BadRequestException('You already have a vehicle');
          }
        } else {
          throw new BadRequestException('User not found, please specify a valid ID user');
        }

        //SAVE THE VEHICLE INFORMED BY THE LICENSE PLATE AND SET THE RESERVE TO AN USER *OR* REMOVE THE RESERVE
        await this.vehicleRepository.save(vehicle);
        if (body.reserved) {
          return 'Vehicle reserved ' + vehicle.licensePlate;
        } else {
          return 'Vehicle unreserved ' + vehicle.licensePlate;
        }
      } else {
        throw new BadRequestException('Vehicle not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //SEARCH FOR VEHICLES IN THE DB
  public async findAll() {
    try {
      //GET ALL THE VEHICLES IN THE DB
      const vehicles = await this.vehicleRepository.find();
      return vehicles;
    } catch (error) {
      throw new BadRequestException('No vehicles found');
    }
  }
}
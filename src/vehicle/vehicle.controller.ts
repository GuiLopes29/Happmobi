import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/user/user.guard';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Get() async findAll() {
    return await this.vehicleService.findAll();
  }

  @UseGuards(UserGuard)
  @Put() async update(@Body() body: any) {
    return await this.vehicleService.update(body);
  }
}

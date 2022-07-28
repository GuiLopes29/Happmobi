import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserGuard } from 'src/user/user.guard';
import { VehicleService } from './vehicle.service';
import { UpdateVehicle, Vehicle } from './entities/vehicle.entity';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @ApiOkResponse({ type: Vehicle, description: 'Vehicles found.' })
  @ApiNotFoundResponse({ description: 'Vehicles not found.' })
  @Get() async findAll() {
    return await this.vehicleService.findAll();
  }

  @UseGuards(UserGuard)
  @ApiOkResponse({ description: 'Vehicle updated.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiBody({ type: UpdateVehicle, description: 'Vehicle to be updated *Reserved*.' })
  @Put() async update(@Body() body: any) {
    return await this.vehicleService.update(body);
  }
}

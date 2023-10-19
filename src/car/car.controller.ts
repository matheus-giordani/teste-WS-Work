import { Carro, Marca, Prisma } from '@prisma/client';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarDto, carAllInfo } from './car.dto';
import { exclude } from 'src/utils/exclude';



@ApiTags('Cars')
@Controller('car')
export class CarController {


    constructor(private carService: CarService){}


    @Get()
    @ApiOperation({ summary: 'Get all Cars' })
    @ApiResponse({
        status: 200,
        description: 'Return all Cars',
        type: CarDto,
        isArray: true
    })
    async getCars(): Promise<Carro[]> {
        return this.carService.getCars()  
    }


    @Get("/info")
    @ApiOperation({ summary: 'Get all Cars' })
    @ApiResponse({
        status: 200,
        description: 'Return all info cars',
        type: CarDto,
        isArray: true
    })
    async getCarsInfo(): Promise<any> {
        const allInfo = await this.carService.allInfo()  
        const formatedInfo = allInfo.map((car) => {
            const obj = {...car, modelo: car.modelo.nome, valor: car.modelo.valor_fipe}
            delete Object.assign(obj, {['nome_modelo']: obj.modelo })['modelo'];
            return obj
        })
        
        return formatedInfo
         
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one Car' })
    @ApiResponse({
        status: 200,
        description: 'Get Car Success',
        type: CarDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Car not found',
                error: 'Not Found',
            },
        },
    })
    async getCar(@Param('id') id: string): Promise<CarDto> {
        return await this.carService.getCar({ id: Number(id) });
        
    }

    @Post()
    @ApiOperation({ summary: 'Create Car' })
    @ApiResponse({
      status: 201,
      description: 'Create Car Success',
      type: CarDto,
    })
    @HttpCode(201)
    async createCar(@Body() marca: CarDto): Promise<CarDto> {
      return await this.carService.createCar(marca);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update Car' })
    @ApiResponse({
        status: 200,
        description: 'Update Car Success',
        type: CarDto,
      })
    async updateCar(@Param('id') id: string, @Body() Car: CarDto): Promise<CarDto>{
        const dataWithoutId = exclude(Car, ['id'])
        return await this.carService.updateCar({where: {id: Number(id)}, data: dataWithoutId});
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Update Car' })
    @ApiResponse({
        status: 200,
        description: 'Delete Car Success',
        type: CarDto,
      })
    async deletemodel(@Param('id') id: string): Promise<CarDto>{
        return await this.carService.DeleteCar({id: Number(id)});
    }



}

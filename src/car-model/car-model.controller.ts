import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModeloDto } from './car-model.dto';
import { CarModelService } from './car-model.service';
import { exclude } from 'src/utils/exclude';

@ApiTags('Models')
@Controller('model')
export class CarModelController {
    constructor(private modelService: CarModelService){}

    @Get()
    @ApiOperation({ summary: 'Get all models' })
    @ApiResponse({
        status: 200,
        description: 'Return all models',
        type: ModeloDto,
        isArray: true
    })
    
    async getModels(): Promise<ModeloDto[]> {
        return await this.modelService.getModels();

    }


    @Get(':id')
    @ApiOperation({ summary: 'Find one user' })
    @ApiResponse({
        status: 200,
        description: 'Get User Success',
        type: ModeloDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Usuário não encontrado',
                error: 'Not Found',
            },
        },
    })
    async getModel(@Param('id') id: string): Promise<ModeloDto> {
        return await this.modelService.getModel({ id: Number(id) });
        
    }


    @Post()
    @ApiOperation({ summary: 'Create Model' })
    @ApiResponse({
      status: 201,
      description: 'Create Model Success',
      type: ModeloDto,
    })
    @HttpCode(201)
    async createModel(@Body() model: ModeloDto): Promise<ModeloDto> {
        return await this.modelService.createModel(model);

    }

    @Put(':id')
    @ApiOperation({ summary: 'Update Model' })
    @ApiResponse({
        status: 200,
        description: 'Update model Success',
        type: ModeloDto,
      })
    async updateModel(@Param('id') id: string, @Body() model: ModeloDto): Promise<ModeloDto>{
        const dataWithoutId = exclude(model, ['id'])
        return await this.modelService.updateModel({where: {id: Number(id)}, data: dataWithoutId});
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Update model' })
    @ApiResponse({
        status: 200,
        description: 'Delete model Success',
        type: ModeloDto,
      })
    async deletemodel(@Param('id') id: string): Promise<ModeloDto>{
        return await this.modelService.deleteModel({id: Number(id)});
    }


}

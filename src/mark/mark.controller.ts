import { Body, Controller, Get, HttpCode, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarkService } from './mark.service';
import { MarcaDto } from './mark.dto';
import { exclude } from '../../src/utils/exclude';


@ApiTags('Marks')
@Controller('mark')
export class MarkController {
    constructor(private markService: MarkService) { }

    @Get()
    @ApiOperation({ summary: 'Get all marks' })
    @ApiResponse({
        status: 200,
        description: 'Return all marks',
        type: MarcaDto,
        isArray: true
    })
    async getMarks(): Promise<MarcaDto[]> {
        return await this.markService.getMarks();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one mark' })
    @ApiResponse({
        status: 200,
        description: 'Get mork Success',
        type: MarcaDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Mark not found',
                error: 'Not Found',
            },
        },
    })
    async getMark(@Param('id') id: string): Promise<MarcaDto> {
        return await this.markService.getMark({ id: Number(id) });
        
    }

    @Post()
    @ApiOperation({ summary: 'Create Mark' })
    @ApiResponse({
      status: 201,
      description: 'Create Mark Success',
      type: MarcaDto,
    })
    @HttpCode(201)
    async createMark(@Body() marca: MarcaDto): Promise<MarcaDto> {
      return await this.markService.createMark(marca);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update mark' })
    @ApiResponse({
        status: 200,
        description: 'Update mark Success',
        type: MarcaDto,
      })
    async updateMark(@Param('id') id: string, @Body() mark: MarcaDto): Promise<MarcaDto>{
        const dataWithoutId = exclude(mark, ['id'])
        return await this.markService.updateMark({where: {id: Number(id)}, data: dataWithoutId});
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Update mark' })
    @ApiResponse({
        status: 200,
        description: 'Delete mark Success',
        type: MarcaDto,
      })
    async deleteMark(@Param('id') id: string): Promise<MarcaDto>{
        return await this.markService.deleteMark({id: Number(id)});
    }


}

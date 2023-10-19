import { Injectable, NotFoundException } from '@nestjs/common';
import { Modelo, Prisma } from '@prisma/client';
import { PrismaService } from '../../src/common/prisma.service';


@Injectable()
export class CarModelService {

    constructor(private prismaService: PrismaService) { }

    getModels(): Promise<Modelo[]> {
        return this.prismaService.modelo.findMany({include: {marca: true}})
    }

    getModel(id: Prisma.ModeloWhereUniqueInput): Promise<Modelo> {
        const existingModel = this.prismaService.modelo.findUnique({ where: id, include: {marca: true} })
        if (!existingModel) throw new NotFoundException('Model not Found')
        return existingModel
    }

    createModel(data: Prisma.ModeloCreateWithoutMarcaInput): Promise<Modelo> {
        return this.prismaService.modelo.create({ data })
    }

    updateModel(params: {
        where: Prisma.ModeloWhereUniqueInput,
        data: Prisma.ModeloUpdateInput
    }): Promise<Modelo> {
        const { where, data } = params;
        return this.prismaService.modelo.update({ where, data })
    }

    deleteModel(where: Prisma.ModeloWhereUniqueInput): Promise<Modelo> {
        return this.prismaService.modelo.delete({ where })
    }

}

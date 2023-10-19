import { Injectable, Delete } from '@nestjs/common';
import { Carro, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { carAllInfo } from './car.dto';

@Injectable()
export class CarService {

    constructor(private prismaService: PrismaService) { }

    async getCars(): Promise<Carro[]> {
        return this.prismaService.carro.findMany()
    }
    async allInfo(): Promise<carAllInfo[]> {
        return this.prismaService.carro.findMany({ include: { modelo: {
            include: { marca: true }
        } },})
    }

    async getCar(id: Prisma.CarroWhereUniqueInput): Promise<Carro> {
        return this.prismaService.carro.findUnique({ where: id, include: { modelo: true },   })
    }

    async createCar(data: Prisma.CarroCreateWithoutModeloInput): Promise<Carro> {
        return this.prismaService.carro.create({ data })
    }

    async updateCar(params: {
        where: Prisma.CarroWhereUniqueInput,
        data: Prisma.CarroUpdateInput
    }): Promise<Carro> {
        const { where, data } = params;
        return this.prismaService.carro.update({ where, data })
    }

    async DeleteCar(where: Prisma.CarroWhereUniqueInput): Promise<Carro> {
        return this.prismaService.carro.delete({ where })
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Marca,Prisma } from '@prisma/client';

@Injectable()
export class MarkService {
    constructor(private prisma: PrismaService){}

    async getMarks(): Promise<Marca[]> {
        return this.prisma.marca.findMany();
    }
    async getMark(id: Prisma.MarcaWhereUniqueInput): Promise<Marca> {
        const existingMark = await this.prisma.marca.findUnique({
          where: id ,
        });
        if (!existingMark) throw new NotFoundException('Marca não encontrada')
        return existingMark
    }

    async createMark(data: Prisma.MarcaCreateInput): Promise<Marca> {
        return this.prisma.marca.create({
          data,
        });
    }

    async updateMark(params: {
        where: Prisma.MarcaWhereUniqueInput;
        data: Prisma.MarcaUpdateInput;
      }): Promise<Marca> {
        const { where, data } = params;
        return this.prisma.marca.update({
          data,
          where,
        });
    }

    async deleteMark(where: Prisma.MarcaWhereUniqueInput): Promise<Marca> {
        return this.prisma.marca.delete({
          where,
        });
    }
}

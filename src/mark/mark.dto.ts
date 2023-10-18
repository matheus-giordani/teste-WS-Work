import { ApiProperty } from '@nestjs/swagger';
import { Marca } from '@prisma/client';
import { z } from 'zod';

export class MarcaDto implements Marca {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome_marca: string;
}
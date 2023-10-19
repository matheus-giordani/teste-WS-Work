import { ApiProperty } from "@nestjs/swagger";
import { Modelo } from "@prisma/client";

export class ModeloDto implements Modelo {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nome: string;
    @ApiProperty()
    marca_id: number;
    @ApiProperty()
    valor_fipe: number;

}
import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Carro, Prisma } from "@prisma/client";
import { PartialBy } from "src/utils/partialBy";


export class CarDto implements PartialBy<Carro, "timestamp_cadastro"> {
    @ApiProperty()
    id: number;
    @ApiProperty()
    timestamp_cadastro?: Date;
    @ApiProperty()
    modelo_id: number;
    @ApiProperty()
    ano: number;
    @ApiProperty()
    combustivel: $Enums.Combustivel;
    @ApiProperty()
    num_portas: number;
    @ApiProperty()
    cor: string;
    
}


export type carAllInfo = Prisma.CarroGetPayload<{ include: { modelo: {
    include: { marca: true }
} }}>
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Models')
@Controller('car-model')
export class CarModelController {}

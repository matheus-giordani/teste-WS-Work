import { Module } from '@nestjs/common';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { CarModelController } from './car-model/car-model.controller';
import { CarModelService } from './car-model/car-model.service';
import { MarkController } from './mark/mark.controller';
import { MarkService } from './mark/mark.service';
import { PrismaService } from './common/prisma.service';
import { PrismaExceptionFilter } from './common/error-handler/prisma-error-handler.filter';
import { FilterExecptionHTTP } from './common/error-handler/http-error-handler.filter';

@Module({
  imports: [],
  controllers: [ CarController, CarModelController, MarkController],
  providers: [ CarService, CarModelService, MarkService, PrismaService, 
  {provide: 'APP_FILTER', useClass: PrismaExceptionFilter},
  {provide: 'APP_FILTER', useClass: FilterExecptionHTTP }
  ],
})
export class AppModule {}

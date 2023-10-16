import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { CarModelController } from './car-model/car-model.controller';
import { CarModelService } from './car-model/car-model.service';
import { MarkController } from './mark/mark.controller';
import { MarkService } from './mark/mark.service';

@Module({
  imports: [],
  controllers: [AppController, CarController, CarModelController, MarkController],
  providers: [AppService, CarService, CarModelService, MarkService],
})
export class AppModule {}

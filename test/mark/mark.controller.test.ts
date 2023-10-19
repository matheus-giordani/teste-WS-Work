import { Test, TestingModule } from '@nestjs/testing';
import { Get, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { MarkService } from '../../src/mark/mark.service';
import { PrismaService } from '../../src/common/prisma.service';
import { GetMarks } from './mock/get.mock';
import { FilterExecptionHTTP } from '../../src/common/error-handler/http-error-handler.filter';
import { PrismaExceptionFilter } from 'src/common/error-handler/prisma-error-handler.filter';

describe('UserController', () => {
    let app: INestApplication;
    let markService: MarkService;
    let moduleRef: TestingModule;
    const prismaService = {
      onModuleInit: jest.fn(),
      enableShutdownHooks: jest.fn(),
    };
    beforeAll(async () => {
      moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        providers: [ {provide: 'APP_FILTER', useClass: FilterExecptionHTTP }]
        
        
      })
        .overrideProvider(PrismaService)
        .useValue(prismaService)
        .overrideFilter(FilterExecptionHTTP)
        .useValue({ catch: jest.fn()})
        .compile();
  
      app = moduleRef.createNestApplication();
      await app.init();
      markService = moduleRef.get<MarkService>(MarkService);
    });
  
    describe('/Get All', () => {
      it('should return a mark array with status 200', async () => {
        jest.spyOn(markService, 'getMarks').mockResolvedValue(GetMarks);
  
        const response = await request(app.getHttpServer())
          .get('/mark')
          .expect(200);
        const marks = response.body;
        expect(marks).toStrictEqual(GetMarks);
      });
    });
  
    describe('/Get mark', () => {
      it('should return a mark with status 200 ', async () => {
        jest.spyOn(markService, 'getMark').mockResolvedValue(GetMarks[0]);
        const response = await request(app.getHttpServer())
          .get('/mark/1')
          .expect(200);
        const mark = response.body;
        expect(mark).toStrictEqual(GetMarks[0]);
      });
  
      
    });
  
    describe('/Post', () => {
      it('should return created mark', async () => {
        jest.spyOn(markService, 'createMark').mockResolvedValue(GetMarks[1]);
        const response = await request(app.getHttpServer())
          .post('/mark')
          .send({nome_marca: 'Chevrolet'})
          .expect(201);
        const createdMark = response.body;
        expect(createdMark).toStrictEqual(GetMarks[1]);
      });
    });
  
    describe('/Put', () => {
      it('should update a mark', async () => {
        jest.spyOn(markService, 'updateMark').mockResolvedValue(GetMarks[1]);
        const requestBody = { nome_marca: 'Chevrolet'}
        const response = await request(app.getHttpServer())
          .put('/mark/2')
          .send(requestBody)
          .expect(200);
        const updatedUser = response.body;
        expect(updatedUser).toStrictEqual(GetMarks[1]);
      }, 100000);
    });

    describe('/Delete', () => {
        it('should delete a mark', async () => {
            jest.spyOn(markService, 'deleteMark').mockResolvedValue(GetMarks[1]);
            const response = await request(app.getHttpServer())
                .delete('/mark/2')
                .expect(200);
            const deletedMark = response.body;
            expect(deletedMark).toStrictEqual(GetMarks[1]);
        })
    });
  
    afterAll(async () => {
      await app.close();
    });
  });

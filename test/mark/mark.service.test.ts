import { Test } from "@nestjs/testing";
import { prismaServiceMock } from "../../src/common/prisma.service.mock";
import { MarkService } from "../../src/mark/mark.service";
import { PrismaService } from '../../src/common/prisma.service';

import { GetMarks } from "./mock/get.mock";

describe('UserService', () => {
    let markservice: MarkService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [MarkService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(prismaServiceMock)
            .compile();
        markservice = moduleRef.get<MarkService>(MarkService);
    });

    describe('getMarks', () => {

        it('should return an array of marks', async () => {
            jest.spyOn(prismaServiceMock.marca, 'findMany').mockResolvedValue(GetMarks)
            expect(await markservice.getMarks()).toBe(GetMarks)
        })

    })

    describe('getMark', () => {
        it('should return a mark', async () => {
            jest.spyOn(prismaServiceMock.marca, 'findUnique').mockResolvedValue(GetMarks[0])
            expect(await markservice.getMark({ id: 1 })).toBe(GetMarks[0])
        })
    })

    describe('createMark', () => {
        it('should create a mark', async () => {
            jest.spyOn(prismaServiceMock.marca, 'create').mockResolvedValue(GetMarks[0])
            expect(await markservice.createMark(GetMarks[0])).toBe(GetMarks[0])
        })
    })

    describe('updateMark', () => {
        it('should update a mark', async () => {
            jest.spyOn(prismaServiceMock.marca, 'update').mockResolvedValue(GetMarks[0])
            expect(await markservice.updateMark({ where: { id: 1 }, data: GetMarks[0] })).toStrictEqual(GetMarks[0])
            expect(prismaServiceMock.marca.update).toBeCalledWith({ where: { id: 1 }, data: GetMarks[0] })
        })
    })

    describe('deleteMark', () => {
        it('should delete a mark', async () => {
            jest.spyOn(prismaServiceMock.marca, 'delete').mockResolvedValue(GetMarks[0])
            expect(await markservice.deleteMark({ id: 1 })).toStrictEqual(GetMarks[0])
            expect(prismaServiceMock.marca.delete).toBeCalledWith({ where: {id:1} })
        })
    })
});
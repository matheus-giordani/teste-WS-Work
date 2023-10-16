import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Marks')
@Controller('mark')
export class MarkController {}

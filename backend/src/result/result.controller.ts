import { Body, Controller, Post } from '@nestjs/common';

import { AddResultkDto } from './dto';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
 constructor(private resultService: ResultService){}
@Post('add')
addMark(@Body() dto:AddResultkDto){
    return this.resultService.addMark(dto)
}

}
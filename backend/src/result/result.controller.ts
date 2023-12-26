import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { AddResultkDto, UpdateResultDto,  } from './dto';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
 constructor(private resultService: ResultService){}
@Post('add')
addMark(@Body() dto:AddResultkDto){
    return this.resultService.addMark(dto)
}

@Patch('update/:id')
updateMark(@Body() dto:UpdateResultDto, @Param('id', ParseIntPipe) resultId:number){
    return this.resultService.updateMark(dto,resultId)
}

}

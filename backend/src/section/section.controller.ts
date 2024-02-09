import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionAddDto } from './dto/sectionAdd.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('section')
@Controller('section')
export class SectionController {
    constructor(private sectionService:SectionService){}

    @Post('add')
    addSection(@Body() dto:SectionAddDto){
        return this.sectionService.addSection(dto)
    }

    @Get('get')
    getSection(){
        return this.sectionService.getSection()
    }
}

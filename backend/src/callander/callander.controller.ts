import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CallanderService } from './callander.service';
import { CallanderDto } from './dto/callander.dto';

import { RoleGuard } from 'src/auth/decorator/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/decorator/enums/role.enum';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('callander')
export class CallanderController {
    constructor(private callnderService: CallanderService ) {}

@UseGuards(JwtGuard, RoleGuard)
@Roles(Role.ADMIN)    
@Post('add')
addCallander(@Body() dto:CallanderDto){
return this.callnderService.addCallander(dto)
}
@Get('all')
getAllCallanders(){
    return this.callnderService.getAllCallanders()
}
@UseGuards(JwtGuard, RoleGuard)
@Roles(Role.ADMIN)  
@Delete('remove/:id')
removeById(@Param('id', ParseIntPipe) id: number,){
    return this.callnderService.removeById(id)
}

}

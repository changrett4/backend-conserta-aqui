import { Body, Controller, Post, Request, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConversaService } from "./conversa.service";
import { CreateConversaDTO } from "./dto/createConversa.dto";
import { Public } from "../auth/auth.decorator";

@Controller("conversa")
@ApiTags("conversa")
export class ConversaController{
    constructor(private conversaService:ConversaService){}

    @Post()
    async createChat(@Body() createConversaDTO:CreateConversaDTO, @Request() request ){
        createConversaDTO.usuarioId = request.user.sub
        return await this.conversaService.create(createConversaDTO);
    }

    @Get("all")
    async getAllByUser(@Request() request){
        return await this.conversaService.getAllByUser(request.user.sub, request.user.type);
    }

    @Public()
    @Get(":id")
    async getById(@Param('id') id:number){
        return await this.conversaService.getById(id);
    }


}
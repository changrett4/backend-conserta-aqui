import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CreateSubcategoriaDTO } from './dto/createSubcategoria.dto';
import { SubcategoriaService } from './subcategoria.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('subcategoria')
@ApiTags('subcategoria')
export class SubcategoriaController {
    constructor(private readonly subcategoriaService:SubcategoriaService){}

    @Public()
    @Post()
    async createSubcategory(@Body() createSubcategoriaDTO:CreateSubcategoriaDTO){
        //console.log("AQUI")
        return this.subcategoriaService.create(createSubcategoriaDTO);
    }

    @Public()
    @ApiOperation({summary: "Retorna as subcategorias relacionadas a uma categoria com determinado id"})
    @Get('categoria/:id')
    async getAllSubcategoriesByCategory(@Param('id') categoryId:number){
        return this.subcategoriaService.getAllByCategory(categoryId);
    }
}

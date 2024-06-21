import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Public } from 'src/auth/auth.decorator';
import { CreateCategoriaDTO } from './dto/createCategoria.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categoria')
@ApiTags('categoria')
export class CategoriaController {
    constructor(private categoriaService: CategoriaService){}

    @Public()
    @Post()
    async createCategory(@Body() createCategoryDto:CreateCategoriaDTO){
        return this.categoriaService.create(createCategoryDto);
    }

    @Public()
    @Get('all')
    async getAllCategories(){
        return this.categoriaService.getAllCategories();
    }

}

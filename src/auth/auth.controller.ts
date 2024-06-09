import { Body, Controller, Request, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginUsuarioDTO } from './dto/LoginUsuario.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async loginUsuario(@Body() dadosLogin:LoginUsuarioDTO){
        return this.authService.login(dadosLogin);
    } 

    
    // @Get('profile')
    // getProfile(@Request() request) {
    //     return request.user;
    // }
}

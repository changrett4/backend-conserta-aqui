import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from 'socket.io';
import { jwtConstants } from "src/auth/constants";

@Injectable()
export class WsocketGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        
       // const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];

        
        try{
            const client: Socket = context.switchToWs().getClient<Socket>();
            const bearerToken = client.handshake.headers.authorization.split(' ')[1];
            
            if(!bearerToken){
                throw new UnauthorizedException("Token inexistente");
            }
         //   console.log(bearerToken);

            const payload = await this.jwtService.verifyAsync(bearerToken,
                {
                    secret: jwtConstants.secret
                }  
            );
            client['user'] = payload;
            //console.log(client['user'])

        } catch(e){
            throw new UnauthorizedException(e.message)
        }

        return true;
    }
}

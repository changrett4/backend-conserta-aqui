import { Controller, Get } from "@nestjs/common";
import { Public } from "./auth/auth.decorator";

@Controller("/")
export class BaseController {

    @Public()
    @Get("/health-check")
    getHealthCheck(){
        console.log("aiai")
        return {msg: "API is Working!"}
    }
}
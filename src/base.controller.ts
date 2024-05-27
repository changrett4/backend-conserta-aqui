import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class BaseController {

    @Get("/health-check")
    getHealthCheck(){
        return {msg: "API is Working!"}
    }
}
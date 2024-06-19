import { Injectable } from "@nestjs/common";
import { ValidationArguments,registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../usuario.entity";
import { Repository } from "typeorm";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUnique implements ValidatorConstraintInterface {
    constructor(        
    private readonly usuarioRepository: UsuarioRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userWithEmail = await this.usuarioRepository.findOneBy({
            email: value
        });
      
        
        return userWithEmail === null
    }
    
}

export const IsUniqueEmail = (validationOptions: ValidationOptions) =>{
    return (object: Object, property: string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUnique,
          });
    }   
}
import { Injectable } from "@nestjs/common";
import { ValidationArguments,registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../usuario.entity";
import { Repository } from "typeorm";

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfIsUniqueValidator implements ValidatorConstraintInterface {
    constructor(        
        @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userWithCpf = await this.usuarioRepository.findOneBy({
            cpf: value
        });
        return userWithCpf !== undefined
    }
    
}

export const IsUniqueCpf = (validationOptions: ValidationOptions) =>{
    return (object: Object, property: string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: CpfIsUniqueValidator,
          });
    }   
}
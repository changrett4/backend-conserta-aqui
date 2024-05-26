import { Injectable } from "@nestjs/common";
import { ValidationArguments,registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfIsUniqueValidator implements ValidatorConstraintInterface {
    constructor(private usuarioRepository: UsuarioRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userWithCpf = await this.usuarioRepository.getUserByCpf(value);
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
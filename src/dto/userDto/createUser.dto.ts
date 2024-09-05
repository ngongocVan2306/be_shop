import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    constructor() {}

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

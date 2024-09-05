import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    constructor() {}

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

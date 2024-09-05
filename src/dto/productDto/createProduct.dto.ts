import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    constructor() {}

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    total: number;
}

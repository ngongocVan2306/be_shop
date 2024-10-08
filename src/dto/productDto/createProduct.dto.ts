import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    constructor() {}

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    total: number;

    @IsNotEmpty()
    type: number;
}

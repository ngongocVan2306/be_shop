import { IsNotEmpty } from 'class-validator';

export class ProductAddCartDto {
    constructor() {}

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    product_id: number;

    @IsNotEmpty()
    count: number;
}

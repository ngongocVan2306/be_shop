import { IsNotEmpty } from 'class-validator';

export class dataChangeCartDto {
    constructor() {}

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    count: number;
}

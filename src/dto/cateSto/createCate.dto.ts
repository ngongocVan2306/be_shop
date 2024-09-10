import { IsNotEmpty } from 'class-validator';

export class CraetecateDto {
    constructor() {}

    @IsNotEmpty()
    name: string;
}

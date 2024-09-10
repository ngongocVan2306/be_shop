import { role } from './enum';

export interface IPayloadJWT {
    id: number;
    email: string;
    role: role;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    avatar: string;
    age: number;
    gender: boolean;
    role: role;
}

export type TRole = 'admin' | 'user';

export interface IProduct {
    id: number;
    name: string;
    total: number;
    price: number;
    type: number;
    inventory: number;
}

export interface IImage {
    id: number;
    img_url: string;
    product_id: string;
}

export interface IDataResLogin {
    user: Omit<IUser, 'password'>;
    tokens: {
        access_token: string;
        refresh_token: string;
    };
}

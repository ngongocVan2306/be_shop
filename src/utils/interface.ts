export interface IPayloadJWT {
    id: number;
    email: string;
    role: number;
    role_detail: string;
    phoneNumber: string;
    is_login_social: boolean;
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
}

export interface IProduct {
    id: number;
    name: string;
    total: number;
    inventory: number;
}

export interface IImage {
    id: number;
    img_url: string;
    product_id: string;
}

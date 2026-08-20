export interface RegisterInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export type LoginInput = {
    email: string;
    password: string;
}
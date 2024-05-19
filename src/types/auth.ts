export interface IAuthData {
    email: string;
    password: string;
    repeatPassword: string;
}

export interface IUserSignin {
    token: string;
    user: {
        _id: string;
        email: string;
        roles: string[];
        member: string[];
    }
}
export interface IUser {
        _id: string;
        avatar: string;
        email: string;
        roles: string[];
        member: string[];
}
export interface IUserAuth {
    email: string;
    password: string;
    repeatPassword: string;
}
export interface IUserValidate {
    user: IUser;
    token: string;
}
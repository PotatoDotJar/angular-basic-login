export interface LoginData {
    username: string;
    password: string;
}

﻿export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface RegisterModel {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
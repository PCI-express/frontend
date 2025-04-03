export type AuthResponse = {
    access: string,
    refresh: string,
}

export type UserRequestData = {
    username?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    password?: string,
    phone_number?: string,
}
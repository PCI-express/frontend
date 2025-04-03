export type ServiceRequestData = {
    id: string,
    address: string,
    comment?: string | null,
    datetime: string,
    payment: string,
    phone_number: string,
    service: string,
    status: string,
}

export type AdminServiceRequestData = {
    id: string,
    user: string,
    address: string,
    comment: string,
    datetime: string,
    payment: string,
    phone_number: string,
    service: string,
    status: string,
}

export type CreateServiceRequestData = {
    address: string,
    datetime: string,
    payment: string,
    phone_number: string,
    service: number,
}

export type ServiceData = {
    id: number,
    name: string,
}
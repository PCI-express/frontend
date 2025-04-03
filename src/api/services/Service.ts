import { httpClient } from "../http-client";

const SLUG = 'service/'

export const serviceList = () => {
    const response = httpClient.get(SLUG + 'list/');
    return response;
}

export const serviceItem = (id: string) => {
    const response = httpClient.get(`${SLUG}list/${id}/`);
    return response;
}
import { CreateServiceRequestData } from "../../helpers";
import { httpClient } from "../http-client";

const SLUG = 'service/'

export const serviceRequestList = () => {
    const response = httpClient.get(SLUG + 'requests/');
    return response;
}

export const serviceRequestPost = (data: CreateServiceRequestData) => {
    const response = httpClient.post(SLUG + 'requests/', data);
    return response;
}

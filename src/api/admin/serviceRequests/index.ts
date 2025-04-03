import { AxiosResponse } from 'axios'
import { AdminServiceRequestData } from "../../../helpers";
import { httpClient } from "../../http-client";

const SLUG = 'admin/service-requests';

export const adminServiceRequestsList = (): Promise<AxiosResponse<AdminServiceRequestData[]>> => {
    const response = httpClient.get(`${SLUG}/`);
    return response;
}

export const adminServiceRequest = (id: string): Promise<AxiosResponse<AdminServiceRequestData>> => {
    const response = httpClient.get(`${SLUG}/${id}/`);
    return response;
}

export const adminServiceRequestPatch = (data: Partial<AdminServiceRequestData>, id: string): Promise<AxiosResponse<AdminServiceRequestData>> => {
    const response = httpClient.patch(`${SLUG}/${id}/`, data);
    return response;
}

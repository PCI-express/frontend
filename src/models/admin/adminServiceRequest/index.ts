import { format, parseISO } from "date-fns";
import { adminServiceRequest, adminServiceRequestPatch, adminServiceRequestsList } from "../../../api";
import { AdminServiceRequestData } from "../../../helpers";
import { BaseStore } from "../../base";
import { ru } from "date-fns/locale";

class AdminServiceRequestStore extends BaseStore {
    emptyData: AdminServiceRequestData = {
        id: '',
        user: '',
        service: '',
        status: '',
        datetime: '',
        payment: '',
        comment: '',
        address: '',
        phone_number: '',
    }
    getServiceRequestsList = async (): Promise<AdminServiceRequestData[]> => {
        try {
           const response = await adminServiceRequestsList();
           const formattedResponse = this.formattingDataList(response.data);
           return formattedResponse;
        } catch (error) {
            this.getError(error);
            return [];
        }
    }

    getServiceRequest = async (id: string): Promise<AdminServiceRequestData> => {
        try {
            const response = await adminServiceRequest(id);
            return response.data;
        } catch (error) {
            this.getError(error);
            return this.emptyData;
        }
    }

    patchServiceRequest = async (data: AdminServiceRequestData): Promise<AdminServiceRequestData> => {
        try {
            const formattedData = {
                service:data.service,
                status: data.status,
                datetime: data.datetime,
                payment: data.payment,
                comment: data.comment,
                address: data.address,
                phone_number: data.phone_number,

            }
            console.log(formattedData)
            const response = await adminServiceRequestPatch(formattedData, data.id);
            return response.data;
        } catch (error) {
            this.getError(error);
            return this.emptyData;
        }
    }

    formattingDataList = (data: AdminServiceRequestData[]) => {
        const formattedData: AdminServiceRequestData[] = []
        for (const item of data) {
            const date = parseISO(item.datetime);

            formattedData.push(
                {
                    'id': item.id,
                    'user': item.user,
                    'service': item.service,
                    'address': item.address,
                    'datetime': format(date, 'MMM d, yyyy HH:mm', { locale: ru }),
                    'payment': item.payment.charAt(0).toUpperCase() + item.payment.slice(1),
                    'phone_number': item.phone_number,
                    'status': item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' '),
                    'comment': item.comment
                }
            );
        }
        
        return formattedData;
    }
    
    formattingData = (data: AdminServiceRequestData): AdminServiceRequestData => {
        const date = parseISO(data.datetime);
        const formattedData: AdminServiceRequestData = {
            'id': data.id,
            'user': data.user,
            'service': data.service,
            'address': data.address,
            'datetime': format(date, 'MMM d, yyyy HH:mm', { locale: ru }),
            'payment': data.payment.charAt(0).toUpperCase() + data.payment.slice(1),
            'phone_number': data.phone_number,
            'status': data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' '),
            'comment': data.comment
        }

        return formattedData;
    }

    
}

export const AdminServiceRequest = new AdminServiceRequestStore()
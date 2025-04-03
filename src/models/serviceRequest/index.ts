import { serviceRequestList, serviceRequestPost } from "../../api";
import { CreateServiceRequestData, ServiceRequestData } from "../../helpers";
import { BaseStore } from "../base";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

class ServiceRequestStore extends BaseStore {
    getServiceRequestList = async (): Promise<ServiceRequestData[]> => {
        try {
            const response = await serviceRequestList();
            const formattedResponse = this.formattingDataList(response.data);
            return formattedResponse
        } catch (error) {
            this.getError(error)
            return []
        }
    }

    formattingDataList = (data: ServiceRequestData[]) => {
        const formattedData: ServiceRequestData[] = [];

        for (const item of data) {
            const date = parseISO(item.datetime);
            const formattedDate = format(date, 'MMM d, yyyy HH:mm', { locale: ru });
            const serviceName = item.service;
            const status = item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ');
            const payment = item.payment.charAt(0).toUpperCase() + item.payment.slice(1);

            formattedData.push(
                {
                    'id': item.id,
                    'service': serviceName,
                    'address': item.address,
                    'datetime': formattedDate,
                    'payment': payment,
                    'phone_number': item.phone_number,
                    'status': status,
                    'comment': item.comment
                }
            );
        }

        return formattedData;
    }

    createServiceRequest = async (data: CreateServiceRequestData) => {
        try {
            await serviceRequestPost(data); 
        } catch (error) {
            this.getError(error)
        }
    }
}

export const ServiceRequest = new ServiceRequestStore()
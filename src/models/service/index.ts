import { serviceItem, serviceList } from "../../api";
import { BaseStore } from "../base";
import { ServiceData } from "../../helpers";

class ServiceStore extends BaseStore {
    getServices = async(): Promise<ServiceData[]> => {
        try {
            const response = await serviceList();
            return response.data;
        } catch (error) {
            this.getError(error);
            return [];  
        }
    }

    getService = async (id: string): Promise<string> => {
        try {
            const response = await serviceItem(id);
            return response.data.name
        } catch (error) {
            this.getError(error)
            return ''
        }
    }

    getServiceByName = async (name: string): Promise<number> => {
        try {
            const response = await this.getServices();
            const service = response.find((service) => service.name === name);

            if (service?.id === undefined) {
                throw new Error('Service not found');
            }

            return service.id;
        } catch (error) {
            this.getError(error);
            return 0;
        } 
    }
}

export const Service = new ServiceStore();
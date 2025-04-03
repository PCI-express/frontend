import { BaseStore } from "../../base";

class AdminUserStore extends BaseStore {
    getUser = async (id: string) => {
        try {
            const response = id;
            return response;
        } catch (error) {
            this.getError(error)
            return '';
        }
    }
}

export const AdminUser = new AdminUserStore();
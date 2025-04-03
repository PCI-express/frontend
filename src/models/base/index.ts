import { AxiosError } from "axios";

interface ApiError {
    error: string;
}

export class BaseStore {
    public error: string = '';
    public permissionError: string = '';

    private errorListeners: ((error: string) => void)[] = [];

    public setErrorListeners(listener: (error: string) => void) {
        this.errorListeners.push(listener);
    }

    public removeErrorListener(listener: (error: string) => void) {
        this.errorListeners = this.errorListeners.filter(l => l !== listener);
    }

    protected notifyErrorListeners() {
        this.errorListeners.forEach(listener => listener(this.error));
    }

    protected getError = (error: unknown) => {
        const axiosError = error as AxiosError; 
        if (axiosError.response) {
            const apiError = axiosError.response.data as ApiError;
            this.error = apiError.error;
            console.error('Server response error:', axiosError.response.data);
            this.notifyErrorListeners();
        }
    }

    validateForm = (fields: string[]): boolean => {
        let validate: boolean = false;
        fields.forEach(element => element === '' ? validate = false : validate = true);
        
        if (validate === false){
            this.error = "Fill in all fields";
            this.notifyErrorListeners();
        }
        return validate;
    }
}
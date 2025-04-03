import { FC, FormEvent, useEffect, useState } from "react";
import { Button, Container, DropdownInput, Input } from "../../../ui";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminServiceRequestData } from "../../../helpers";
import { AdminServiceRequest, Service } from "../../../models";

const initialFormState = {
    ...AdminServiceRequest.emptyData
}

export const AdminServiceRequestPatchForm: FC = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState<AdminServiceRequestData>(initialFormState);
    const [serviceOptions, setServiceOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFormData() {
            setIsLoading(true);
            try {
                const data = await AdminServiceRequest.getServiceRequest(id || '');
                const services = await Service.getServices();
                const service = await Service.getService(data.service || '');
                const formattedData = formatServiceData(data, service);
                setServiceOptions(services.map((s) => s.name));
                setFormData(formattedData);
                isCancelled(formattedData.status || '');
            } catch {
                setError('Failed to load data.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchFormData();
    }, [id]);

    const formatServiceData = (data: AdminServiceRequestData, service: string) => {
        const datetime = data.datetime?.replace('Z', '') || '';
        if (!data.user) {
            return { ...data, service: service, datetime: datetime, user: '0' };
        }
        return { ...data, service, datetime };
    };

    const isCancelled = (value: string) => {
        if (value === 'cancelled'){
            setCancelled(true);
        }
        else {
            setCancelled(false);
        }
    }

    const resetData = async () => {
        try {
            const data = await AdminServiceRequest.getServiceRequest(id || '');
            const services = await Service.getServices();
            const service = await Service.getService(data.service || '');
            const formattedData = formatServiceData(data, service);
            setServiceOptions(services.map((s) => s.name));
            setFormData(formattedData);
            isCancelled(formattedData.status || '');
        } catch {
            setError('Failed to load data.');
        }
    }

    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const dataValidated = (): boolean => 
                    AdminServiceRequest.validateForm([...Object.keys(formData).map((key) => formData[key as keyof AdminServiceRequestData])])
                    ? true : false;

        
        if (dataValidated()){
            const requestData = {
                    ...formData,
                    service: (await Service.getServiceByName(formData.service)).toString(),
                }
            AdminServiceRequest.patchServiceRequest(requestData);
        }
        navigate('/admin/service-requests')
    }

    if (isLoading) {
        return (
            <Container className="p-15">
                <form className="w-200 h-121 flex items-center justify-center">
                    <h1 className="font-bold text-5xl text-indigo-400 cursor-default">
                       Loading...  
                    </h1>
                </form>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="p-15">
                <form className="w-200 h-121 flex items-center justify-center">
                    <h1 className="font-bold text-5xl text-indigo-400 cursor-default">
                       {error} 
                    </h1>
                </form>
            </Container>
        );
    }

    if (formData === initialFormState) {
        return (
            <Container className="p-15">
                <form className="w-200 h-121 flex items-center justify-center">
                    <h1 className="font-bold text-5xl text-indigo-400 cursor-default">
                       Data not found! 
                    </h1>
                </form>
            </Container>
        );
    }

    return (
        <Container className="p-15">
            <form onSubmit={handelSubmit} className="w-200">
                <div className="w-full">
                    <h1 className="font-bold text-3xl mb-16 text-indigo-400 cursor-default">
                        Patch a request for the service 
                    </h1>
                </div>
                <div className="w-full cursor-default text-lg">
                    <div className="w-full flex mb-5 gap-2 ">
                        <div className="w-[50%] p-3 border-2 border-solid border-neutral-200 rounded-md px-4 py-2">
                            ID:
                            <span className="text-indigo-400 ml-3">
                                {formData.id} 
                            </span>
                        </div>
                        <div className="w-[50%] px-3 border-2 border-solid border-neutral-200 rounded-md px-4 py-2">
                            User: 
                            <span className="text-indigo-400 ml-3">
                                {formData.user} 
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <Input 
                            name="address"
                            type="text"
                            value={formData.address || ''}
                            className="w-[50%]"
                            handleChange={(e) => setFormData((l) => ({...l, address: e.target.value}))}
                        />
                        <DropdownInput
                            options={serviceOptions}
                            onChange={(value) => setFormData((l) => ({...l, service: value}))}
                            name="service"
                            className="w-[50%]"
                            selected={formData.service}
                        />
                    </div>
                    <div className="flex gap-2 w-full">
                        <DropdownInput
                            options={['at-work', 'done', 'cancelled']}
                            onChange={(value) => setFormData((l) => {
                                isCancelled(value);
                                return {...l, status: value}
                            })}
                            name="status"
                            className="w-[50%]"
                            selected={formData.status} 
                        />
                        <Input 
                            name="date-time"
                            type="datetime-local"
                            value={formData.datetime || ''}
                            handleChange={(e) => setFormData((l) => ({...l, datetime: e.target.value}))}
                            className="w-[50%]"
                        />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Input 
                            name="phone number"
                            type="tel"
                            value={formData.phone_number || ''}
                            handleChange={(e) => setFormData((l) => ({...l, phone_number: e.target.value}))}
                            pattern="^(\+7|8)[\s]\([489][0-9]{2}\)[\s][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}$"
                            className="w-[50%]"
                        />
                        <DropdownInput
                            options={['cash', 'cashless']}
                            onChange={(value) => setFormData((l) => ({...l, payment: value}))}
                            name="payment"
                            className="w-[50%]"
                            selected={formData.payment} 
                        />
                    </div>
                    {cancelled && (
                        <div className="w-full">
                            <Input 
                                name="Comment"
                                type="text"
                                value={formData.comment || ''}
                                handleChange={(e) => setFormData((l) => ({...l, comment: e.target.value}))}
                            />
                        </div>
                    )}
                    
                </div>
                <div className="flex w-full gap-2">
                    <Button 
                        name='Reset'
                        type='button'
                        className="w-[50%]"
                        inversion={true}
                        onClick={resetData}
                    />
                    <Button 
                        name='Submit'
                        type='submit'
                        className="w-[50%]"
                    />
                </div>
                <div className="w-full text-center mt-8">
                    <Link to='admin/service-requests' className="text-indigo-400 hover:text-indigo-500 transition-color duration-300">
                        Return to the service requests list
                    </Link>
                </div>
            </form> 
        </Container>    
    )
}
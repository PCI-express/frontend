import { FC, FormEvent, useLayoutEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Input, Button, DropdownInput } from "../../ui"
import { CreateServiceRequestData } from "../../helpers"
import { User, ServiceRequest, Service } from "../../models"
import { parseISO } from "date-fns"

const initialFormState = {
    address: '',
    datetime: '',
    payment: 'cash',
    phone_number: '',
    service: '',
}

export const ServiceRequestCreationForm: FC = () => {
    const [formData, setFormData] =  useState(initialFormState);
    const [serviceOptions, setServiceOptions] = useState<string[]>([]);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        async function fetchFormData() {
            const data = await User.getDataForServiceRequest();
            const services = await Service.getServices();

            setServiceOptions(services.map((s) => s.name));
            setFormData((l) => ({...l, ...data}));
        }

        fetchFormData();
    
    }, []);

    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const dataValidated = (): boolean =>
            ServiceRequest.validateForm([...Object.keys(formData).map((key) => formData[key as keyof CreateServiceRequestData])])
            ? true : false;

        if (dataValidated()) {
            const requestData = {
                ...formData,
                datetime: parseISO(formData.datetime).toISOString(),
                service: await Service.getServiceByName(formData.service),
            }
            ServiceRequest.createServiceRequest(requestData);
            navigate('/service-requests');
        }
    }

    return (
        <Container className="p-15 w-fit">
            <form onSubmit={handelSubmit} className="w-200">
                <div className="w-full">
                    <h1 className="font-bold text-3xl mb-16 text-indigo-400 cursor-default">
                        Submit a request for the service 
                    </h1>
                </div>
                <div className="w-full">
                    <div className="w-full">
                        <Input 
                            name="address"
                            type="text"
                            value={formData.address || ''}
                            handleChange={(e) => setFormData((l) => ({...l, address: e.target.value}))}
                        />
                    </div>
                    <div className="flex gap-2 w-full">
                        <DropdownInput
                            options={serviceOptions}
                            onChange={(value) => setFormData((l) => ({...l, service: value}))}
                            name="service"
                            className="w-[50%]"
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
                        />
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <Button 
                        name='Discover'
                        type='button'
                        className="w-[50%]"
                        inversion={true}
                    />
                    <Button 
                        name='Submit'
                        type='submit'
                        className="w-[50%]"
                    />
                </div>
                <div className="w-full text-center mt-8">
                    <Link to='/service-requests' className="text-indigo-400 hover:text-indigo-500 transition-color duration-300">
                        Return to the service requests list
                    </Link>
                </div>
            </form> 
        </Container>    
    )
}
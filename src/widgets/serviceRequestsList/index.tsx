import { FC, useEffect, useLayoutEffect, useState } from "react"
import { Button, Container } from "../../ui"
import { ServiceRequest, Service } from "../../models"
import { ServiceRequestData } from "../../helpers"
import { ServiceRequestRow } from "../../features/serviceRequestRow"
import { ServiceRequestsHeaderList } from "../../features/serviceRequestsHeaderList"
import { useNavigate } from "react-router-dom"

export const ServiceRequestsList: FC = () => {
    const [serviceRequestList, setServiceRequestList] = useState<ServiceRequestData[]>()
    const [error, setError] = useState<string | null>()
    const navigate = useNavigate();

    useLayoutEffect(() => {
        async function fetchServiceRequestList() {
            const data = await ServiceRequest.getServiceRequestList();
            const formattedData = [];
            for(const item of data) {
                const serviceName = await Service.getService(item.service);
                formattedData.push({
                    ...item,
                    service: serviceName
                })
            }
            
            setServiceRequestList(formattedData);
        }
        fetchServiceRequestList()
        
    }, []);

    useEffect(() => {
        const errorListener = (error: string) => {
            setError(error || null);
        };

        ServiceRequest.setErrorListeners(errorListener);

        return () => {
            ServiceRequest.removeErrorListener(errorListener);
        }        
    }, []);
    
    const handleRedirect = () => {
        navigate('add');
    };
    
    return (
        <Container className="h-full p-15 w-fit">
            <div className="mb-16 flex justify-between">
                <h2 className='font-bold text-3xl text-indigo-400 cursor-default'>
                    Service Requests
                </h2>
                <Button
                    name="Add Service Request"
                    type="button"
                    className="w-60"
                    inversion={true}
                    onClick={handleRedirect}
                />
            </div>
            {error && (
                <div className="text-red-500 mb-5 text-center text-3xl w-300">
                    {error}
                </div>
            ) || (
                <>
                    <div className="">
                        <ServiceRequestsHeaderList
                            id="ID"
                            address="Address"
                            phone_number="Phone Number"
                            datetime="Date & Time"
                            service="Service"
                            payment="Payment"
                            status="Status"
                            comment="Comment"
                        />
                    </div>
                    <div>
                        {serviceRequestList?.map((data) => {
                            return (
                                <ServiceRequestRow
                                    id={data.id}
                                    address={data.address} 
                                    phone_number={data.phone_number} 
                                    datetime={data.datetime} 
                                    service={data.service} 
                                    payment={data.payment} 
                                    status={data.status}
                                    comment={data.comment} 
                                />
                            )
                        })}
                    </div>
                </>
            )}
            
        </Container>
    )
}

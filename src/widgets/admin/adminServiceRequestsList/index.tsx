import { FC, useEffect, useLayoutEffect, useState } from "react"
import { Container } from "../../../ui"
import { AdminServiceRequestRow } from "../../../features"
import { AdminServiceRequestData } from "../../../helpers"
import { AdminServiceRequest, Service} from "../../../models"
import { AdminUser } from "../../../models/admin/adminUser"

export const AdminServiceRequestsList: FC = () => {
    const [serviceRequestList, setServiceRequestList] = useState<AdminServiceRequestData[]>()
    const [error, setError] = useState<string | null>()

    useLayoutEffect(() => {
        async function fetchServiceRequestList() {
            const data = await AdminServiceRequest.getServiceRequestsList();
            const formattedData = [];
            for(const item of data) {
                const serviceName = await Service.getService(item.service);
                const userName = await AdminUser.getUser(item.user)
                formattedData.push({
                    ...item,
                    service: serviceName,
                    user: userName
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

        AdminServiceRequest.setErrorListeners(errorListener);

        return () => {
            AdminServiceRequest.removeErrorListener(errorListener);
        }        
    }, []);

    return (
        <Container className="p-15">
            {error && (
                <div className="text-red-500 mb-5 text-center text-3xl w-300">
                    {error}
                </div>
            ) || (
                <>
                    <div>
                        {serviceRequestList?.map((data) => {
                            return (
                                <AdminServiceRequestRow
                                    id={data.id}
                                    user={data.user}
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
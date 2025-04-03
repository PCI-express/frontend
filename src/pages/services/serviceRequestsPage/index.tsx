import { FC } from "react"
import { ServiceRequestsList } from "../../../widgets/serviceRequestsList"

export const ServiceRequestsPage: FC = () => {
    return (
        <div className="flex bg-neutral-200 h-full w-full">
            <div className="mx-auto h-full">
                <ServiceRequestsList />
            </div>
        </div>
    )
}
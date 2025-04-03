import { FC } from "react"
import { ServiceRequestCreationForm } from "../../../widgets/serviceRequestCreationForm"

export const ServiceRequestCreationPage: FC = () => {
    return(
        <div className="flex bg-neutral-200 h-full w-full">
            <div className="m-auto">
                <ServiceRequestCreationForm />
            </div>
        </div>
    )
}
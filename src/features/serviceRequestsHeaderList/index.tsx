import { FC } from "react";
import { ServiceRequestData } from "../../helpers/services/type";


export const ServiceRequestsHeaderList: FC<ServiceRequestData> = (props) => {
    return (
        <div className="flex border-b border-neutral-200 pb-6 px-4">
            <div className="w-12 text-center">
                {props.id}
            </div>
            <div className="w-50 text-center">
                {props.service}
            </div>
            <div className="w-45 text-center">
                {props.address}
            </div>
            <div className="w-30 text-center">
                {props.datetime}
            </div>
            <div className="w-45 text-center">
                {props.phone_number}
            </div>
            <div className="w-20 text-center">
                {props.payment}
            </div>
            <div className="w-30 text-center">
                {props.status}
            </div>
            <div className="w-60 text-center">
                {props.comment}
            </div>
        </div>
    )
}

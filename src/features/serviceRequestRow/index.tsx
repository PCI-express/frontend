import { FC } from "react";
import { ServiceRequestData } from "../../helpers";


export const ServiceRequestRow: FC<ServiceRequestData> = (props) => {
    return (
        <div className="flex border-b border-neutral-200 py-2 px-4">
            <div className="w-12 text-center text-neutral-400">
                {props.id}
            </div>
            <div className="w-50 text-center font-semibold">
                {props.service}
            </div>
            <div className="w-45 text-center text-neutral-400">
                {props.address}
            </div>
            <div className="w-30 text-center font-semibold ">
                {props.datetime}
            </div>
            <div className="w-45 text-center text-neutral-400">
                {props.phone_number}
            </div>
            <div className="w-20 text-center text-neutral-400">
                {props.payment}
            </div>
            <div className="w-30 text-center text-neutral-400">
                {props.status}
            </div>
            <div className="w-60 text-center text-red-500 font-semibold">
                {props.comment}
            </div>
        </div>
    )
}

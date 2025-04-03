import { FC } from "react"
import { AdminServiceRequestData } from "../../../helpers"
import { Button } from "../../../ui"
import { useNavigate } from "react-router-dom"

export const AdminServiceRequestRow: FC<AdminServiceRequestData> = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/admin/service-requests/${props.id}`)
    }
    
    return (
        <div className="flex border-b border-neutral-200 py-2 px-4">
            <div className="w-10 text-center">
                {props.id}
            </div>
            <div className="w-30 text-center">
                {props.user}
            </div>
            <div className="w-40 text-center">
                {props.service}
            </div>
            <div className="w-40 text-center">
                {props.address}
            </div>
            <div className="w-30 text-center">
                {props.datetime}
            </div>
            <div className="w-30 text-center">
                {props.status}
            </div>
            <div className="w-50 px-5">
                <Button
                    name="Patch"
                    type="button"
                    onClick={handleClick}
                    inversion={true}
                />
            </div>
        </div>
    )
}
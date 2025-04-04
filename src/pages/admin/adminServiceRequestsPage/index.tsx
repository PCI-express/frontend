import { FC } from "react"
import { AdminServiceRequestsList } from "../../../widgets/admin"

export const AdminServiceRequestsPage: FC = () => {
    return (
        <div className="flex bg-neutral-200 h-full w-full">
            <div className="mx-auto h-full">
                <AdminServiceRequestsList />
            </div>
        </div>
    )
}
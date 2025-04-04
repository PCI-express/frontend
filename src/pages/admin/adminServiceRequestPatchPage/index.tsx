import { FC } from "react"
import { AdminServiceRequestPatchForm } from "../../../widgets/admin"

export const AdminServiceRequestPatchPage: FC = () => {
    return(
        <div className="flex bg-neutral-200 h-full w-full">
            <div className="mx-auto">
                <AdminServiceRequestPatchForm />
            </div>
        </div>
    )
}
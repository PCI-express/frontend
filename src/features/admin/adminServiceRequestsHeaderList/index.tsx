import { FC } from "react";

export const AdminServiceRequestsHeaderList: FC = () => {
    return (
        <div className="flex border-b border-neutral-200 pb-6 px-4">
            <div className="w-10 text-center">
                ID
            </div>
            <div className="w-30 text-center">
                User
            </div>
            <div className="w-40 text-center">
                Service
            </div>
            <div className="w-40 text-center">
                Address
            </div>
            <div className="w-30 text-center">
                Date-time
            </div>
            <div className="w-30 text-center">
                Status
            </div>
             <div className="w-50 px-5">
                patch
            </div>
        </div>
    )
}

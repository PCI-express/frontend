import { FC } from "react"
import { Link, Outlet } from "react-router-dom"

export const AdminLayout: FC = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div>
                <Link to='service-requests'>
                    Service Requests
                </Link>
            </div>
            <Outlet />
        </div>
    )
}
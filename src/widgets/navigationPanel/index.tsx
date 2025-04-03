import { FC } from "react"
import { Link, useLocation } from "react-router-dom"

export const NavigationPanel: FC = () => {
    const location = useLocation();

    const isActive = (path: string): boolean => {
        return location.pathname.startsWith(path);
    };

    return (
        <div className="py-10 mr-2 w-70 h-full bg-white shadow-md shadow-neutral-400">
            <div className="px-10 mb-15">
                <h1 className="font-bold text-2xl text-indigo-400 cursor-default">
                    Navigation.
                </h1>
            </div>
            <Link to='/user'>
                <div className="py-4 pl-10 hover:bg-indigo-50 transition-colors duration-300 relative mb-5">
                    <div className={`${isActive('/user') ? 'bg-indigo-400' : 'bg-neutral-300' } h-full w-2 absolute top-0 left-0 rounded-r-md`}></div>
                    Profile
                </div>
            </Link>
            <Link to='/service-requests'>
                <div className="py-4 pl-10 hover:bg-indigo-50 transition-colors duration-300 relative mb-5">
                    <div className={`${isActive('/service-requests') ? 'bg-indigo-400' : 'bg-neutral-300' } h-full w-2 absolute top-0 left-0 rounded-r-md`}></div>
                    Service Requests
                </div>
            </Link>
            <Link to='/admin'>
                <div className="py-4 pl-10 hover:bg-indigo-50 transition-colors duration-300 relative mb-5">
                    <div className={`${isActive('/admin') ? 'bg-indigo-400' : 'bg-neutral-300' } h-full w-2 absolute top-0 left-0 rounded-r-md`}></div>
                    Admin panel
                </div>
            </Link>
        </div>
    )
}

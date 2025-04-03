import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { FC } from "react";
import { AuthProvider } from "../entity";

export const App: FC = () => {
    return (
        <AuthProvider>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
        
    )
}
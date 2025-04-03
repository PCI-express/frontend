import { FC } from "react"
import { LoginForm } from "../../../widgets/loginForm"

export const LoginPage: FC = () => {
    return (
        <div className="flex bg-neutral-200 h-full w-full">
            <LoginForm />
        </div>
    )
}

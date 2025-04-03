import { FC } from "react"
import { RegistrationForm } from "../../../widgets/registrationForm"

export const RegistrationPage: FC = () => {
    return (
        <div className="flex bg-neutral-200 h-full w-full">
            <RegistrationForm />
        </div>
    )
}

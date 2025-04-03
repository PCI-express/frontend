import { FC } from "react"
import { PersonalInformForm } from "../../../widgets/personalInformForm"

export const ProfilePage: FC = () => {
    return (
        <div className="flex bg-neutral-200 h-full w-full">
            <PersonalInformForm />
        </div>
    )
}
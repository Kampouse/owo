import { ReactNode } from "react"
import { Logout } from "@/components"
import { PrivateLayout } from "@/components/Layouts"
import ProfileLayout from '@/components/Profile/ProfileLayout'

const UserProfile = () => {
  return (
    <Logout />
  )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout><ProfileLayout>{page}</ProfileLayout></PrivateLayout>
}


export default UserProfile

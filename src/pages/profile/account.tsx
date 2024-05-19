import { ReactNode } from "react"
import { ProfileAccount } from "@/components/ProfilePage/Account"
import { PrivateLayout } from "@/components/Layouts"
import ProfileLayout from '@/components/ProfilePage/ProfileLayout'

const UserProfile = () => {
  return (
    <ProfileAccount />
  )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout><ProfileLayout>{page}</ProfileLayout></PrivateLayout>
}


export default UserProfile

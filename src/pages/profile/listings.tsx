import { ReactNode } from "react"
import { ProfileListings } from "@/components"
import { PrivateLayout } from "@/components/Layouts"
import ProfileLayout from '@/components/Profile/ProfileLayout'


const UserProfile = () => {
  return (
    <div>
      <ProfileListings />
    </div>
  )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout><ProfileLayout>{page}</ProfileLayout></PrivateLayout>
}


export default UserProfile

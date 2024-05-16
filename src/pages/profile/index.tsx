import { ReactNode } from "react"
import { Profile } from "@/components"
import { PrivateLayout } from "@/components/Layouts"
import { Listings } from "@/components"
import ProfileLayout from '@/components/ProfilePage/ProfileLayout'

const UserProfile = () => {
  return (
    <div>
      <Listings />
    </div>
  )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout><ProfileLayout>{page}</ProfileLayout></PrivateLayout>
}


export default UserProfile

import { ReactNode } from "react"
import { UserListings } from "@/components/ProfilePage/Listings"
import { PrivateLayout } from "@/components/Layouts"
import ProfileLayout from '@/components/ProfilePage/ProfileLayout'


const UserProfile = () => {
  return (
    <UserListings />
  )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout><ProfileLayout>{page}</ProfileLayout></PrivateLayout>
}


export default UserProfile

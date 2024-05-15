import { Container, Row, Col, Tab, ListGroup } from "react-bootstrap";
import Badges from './Badges'
import UpdatePasswordForm from './UpdatePasswordForm'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import UserListings from './Listings'
import { Card, CardContent, CardDescription, CardImg, CardTitle, CardHeader } from "@/components/ui/card";


import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({}) => {
  const { user, logout } = useAuthentication();
  const router = useRouter()
  if (!user) { return (<span>LOADING PROFILE</span>) }

  return(
    <>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={"https://api.multiavatar.com/" + user.id + '.png'} />
                <AvatarFallback>OH</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-none">{user.username}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription></CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center space-y-4 w-48">
            <Avatar className="w-32 h-32">
              <AvatarImage src={`/badges/habitus.png`} />
              <AvatarFallback>Béta Habitus🌿</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-medium leading-none">Béta Habitus🌿</p>
              <p className="text-sm text-muted-foreground">#account-creation-date</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Profile;

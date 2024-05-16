import Badges from './Badges'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { Card, CardContent, CardDescription, CardImg, CardTitle, CardHeader } from "@/components/ui/card";


import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({}) => {
  const { user } = useAuthentication();
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
                <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-none">{user.username}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Badges />

    </>
  )
}

export default Profile;

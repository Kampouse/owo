import UpdatePasswordForm from './UpdatePasswordForm'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";

import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";

const Profile = ({ }) => {
  const { user, logout } = useAuthentication();
  const router = useRouter()
  if (!user) { return (<span>LOADING PROFILE</span>) }

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Here you can manage your personnal informations
        </p>
      </div>
      <Separator />
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Personnal informations</CardTitle>
          <CardDescription>This is your personnal and confidential infomraitons, thay are not shared withot anyone wihtout your explicit consent.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.name}</p>
          <p>Postal Code: ##user.postalcode // TODO: </p>
        </CardContent>
      </Card>
      <UpdatePasswordForm />
    </>
  )

}

export default Profile;

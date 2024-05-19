import { UpdatePasswordForm } from './UpdatePasswordForm'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export const ProfileAccount = ({ }) => {
  const { user } = useAuthentication();

  if (!user) { return (<span>LOADING PROFILE</span>) }

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Here you can manage your personal informations
        </p>
      </div>
      <Separator />
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Personal informations</CardTitle>
          <CardDescription>This is your personal and confidential informations, they are not shared with anyone without your explicit consent.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.name}</p>
          <p>Postal Code: {user.postalcode} </p>
        </CardContent>
      </Card>
      <UpdatePasswordForm />
    </>
  )

}

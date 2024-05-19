'use client'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

export const Logout = ({ }) => {
  const router = useRouter()
  const { logout } = useAuthentication();

  useEffect(() => {
   logout(() => router.replace('/'))
  }, [])


  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Logging you out</h3>
        <p className="text-sm text-muted-foreground">
          You will be redirected in a few seconds
        </p>
      </div>
      <Separator />
    </>
  )

}

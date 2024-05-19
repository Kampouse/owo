import { SidebarNav } from "@/components/ui/sidebarNav"

const sidebarNavItems = [
  {
    title: "Mon profil",
    href: "/profile",
  },
  {
    title: "Mon compte",
    href: "/profile/account",
  },
  {
    title: "Mes Annonces",
    href: "/profile/listings",
  },
  {
    title: "Me déconnecter",
    href: "/profile/logout",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}

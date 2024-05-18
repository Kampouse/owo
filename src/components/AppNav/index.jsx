import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import {
  OwoIcon,
  NewspaperIcon,
  MessagesSquareIcon,
  PlusIcon,
  UserIcon,
  BellIcon,
  MenuIcon
} from '@/components/ui/icons'
import { useUserNotification } from '@/notifications/useUserNotifications';

import { cn } from "@/lib/utils"

const AppNav = () => {
  const { hasNewNotification  } = useUserNotification()
  return (
    <header className="flex h-16 w-full items-center justify-between py-4 px-6 md:px-8  bg-gray-900 text-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
      <Link className="flex items-center gap-2" href="/listings">
        <OwoIcon className="h-6 w-6" />
        <span className="sr-only">owo</span>
      </Link>
      <nav className="hidden flex-1 justify-center lg:flex items-center gap-6">
        <Link
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
          href="/listings"
        >
          <NewspaperIcon className="h-5 w-5" />
          <span className="hidden md:inline">Annonces</span>
        </Link>
        <Link
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
          href="/messages"
        >
          <MessagesSquareIcon className="h-5 w-5" />
          <span className="hidden md:inline">Messages</span>
        </Link>
        <Link
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
          href="/listings/create"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden md:inline">Annoncer</span>
        </Link>
        <Link
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
          href="/profile"
        >
          <UserIcon className="h-5 w-5" />
          <span className="hidden md:inline">Profil</span>
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
          href="/notifications"
        >
          <BellIcon className={cn("h-5 w-5", { 'text-red-500': hasNewNotification })} />
          <span className="hidden">Notifications</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full lg:hidden" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6 text-black" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link className="flex items-center gap-2" href="/listings">
                <NewspaperIcon className="h-5 w-5" />
                <span>Annonces</span>
              </Link>
              <Link className="flex items-center gap-2" href="/messages">
                <MessagesSquareIcon className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link className="flex items-center gap-2" href="/listings/create">
                <PlusIcon className="h-5 w-5" />
                <span>Annoncer</span>
              </Link>
              <Link className="flex items-center gap-2" href="/profile">
                <UserIcon className="h-5 w-5" />
                <span>Profil</span>
              </Link>
              <Link className="flex items-center gap-2" href="/notifications">
                <BellIcon className={cn("h-5 w-5", { 'text-red-500': hasNewNotification })} />
                <span>Notifications</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default AppNav;

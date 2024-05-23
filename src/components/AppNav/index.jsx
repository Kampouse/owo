import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "@/components/ui/sheet"
import {
  OwoIcon,
  NewspaperIcon,
  MessagesSquareIcon,
  PlusIcon,
  UserIcon,
  BellIcon,
  MenuIcon,
  LockIcon,
} from '@/components/ui/icons'
import { useUserNotification } from '@/notifications/useUserNotifications';
import { Notifications } from '@/components/Notifications';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"

export const AppNav = () => {
  const { conversationsByStatus, notifications, hasNewNotification } = useUserNotification()
  return (
    <>
      <header className="flex h-16 w-full items-center justify-between py-4 px-6 md:px-8  bg-primary text-white shadow-sm">
        <Link className="flex items-center gap-2 hover:text-white" href="/listings">
          <OwoIcon className="w-16" />
          <span className="sr-only">owo</span>
        </Link>
        <nav className="hidden flex-1 justify-center lg:flex items-center gap-6">
          <Link
            className="no-underline flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
            href="/listings"
          >
            <NewspaperIcon className="h-5 w-5" />
            <span className="hidden md:inline">Annonces</span>
          </Link>
          <Link
            className="no-underline flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
            href="/messages"
          >
            <MessagesSquareIcon className="h-5 w-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
          <Link
            className="no-underline flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
            href="/listings/create"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden md:inline">Annoncer</span>
          </Link>
          <Link
            className="no-underline flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500"
            href="/profile"
          >
            <UserIcon className="h-5 w-5" />
            <span className="hidden md:inline">Profil</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost">
                <BellIcon className={cn("h-5 w-5", hasNewNotification ? 'text-red-500' : 'text-white' )} />
                {conversationsByStatus.totalOf('new') > 0 &&
                  <Badge className="absolute -translate-y-1/2 py-0 px-2 ml-5">
                    {conversationsByStatus.totalOf('new')}
                  </Badge>
                }
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Notifications notifications={notifications} actionComponent={SheetClose} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6 text-black" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/listings">
                    <NewspaperIcon className="h-5 w-5" />
                    <span>Annonces</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/messages">
                    <MessagesSquareIcon className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/listings/create">
                    <PlusIcon className="h-5 w-5" />
                    <span>Annoncer</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/profile">
                    <UserIcon className="h-5 w-5" />
                    <span>Profil</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/notifications">
                    <BellIcon className={cn("h-5 w-5", { 'text-red-500': hasNewNotification })} />
                    <span>Notifications</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="flex items-center gap-2 py-2" href="/profile/logout">
                    <LockIcon className={cn("h-5 w-5", { 'text-red-500': hasNewNotification })} />
                    <span>Déconnexion</span>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <Button as={Link} aria-label="Annoncer" size="icon" href="/listings/create" variant="primary" className="rounded-full">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

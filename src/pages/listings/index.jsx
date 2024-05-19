import useListing from '@/contexts/listing/useListing'
import { useEffect, useState } from 'react';
import Listing from '@/components/Listing'
import { Form, FormControl, Spinner } from 'react-bootstrap';
import { Button } from "@/components/ui/button"
import { PrivateLayout } from "@/components/Layouts"
import { useRouter } from 'next/router'
import useAuthentication from '@/contexts/authentication/useAuthentication';
import { initializeConversation } from "@/conversations/ConversationClient";
import { IoIosChatbubbles } from 'react-icons/io';
import { SearchIcon } from '@/components/ui/icons';

const Listings = () => {
  const { user } = useAuthentication();
  const { loading, listings, getAll, search } = useListing()
  const [currentSearch, setCurrentSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    getAll()
  }, [])

  const createConversation = async ({ title, user1, user2 }) => {
    const loaded = await initializeConversation({ title: title, users: [user1, user2] })
    router.push(`/messages/${loaded.id}`)
  }

  // TODO: submit on stop writing if not "enter"
  const searchAction = (event) => {
    search(currentSearch)
    event.preventDefault()
  }

  useEffect(() => {
    if (currentSearch === '') {
      getAll()
    }
  }, [currentSearch])

  return (
  <>
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold">Le marché</div>
      <Form className="relative w-full max-w-md" method="post" onSubmit={searchAction}>
        <FormControl
          type="search"
          placeholder="Search products..."
          className="w-full bg-white dark:bg-gray-950 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-700"
          onChange={(event) => setCurrentSearch(event.target.value)}
          value={currentSearch}
        />
        {loading ?
          <Spinner as="span" size="sm" /> :
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        }
      </Form>
    </header>

    <div className="grid grid-cols-1 gap-8 p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => {
          return (
            <Listing listing={listing} key={`listingpage-${listing.id}`}>
              {
                user.id !== listing.userProfile.id &&
                <Button className="mt-4 w-full" size="sm" onClick={() => createConversation({ title: listing.title, user1: user.id, user2: listing.userProfile.id })}>
                  <IoIosChatbubbles className="icon" />
                </Button>
              }
            </Listing>
          )
        })}
      </div>
  </div>
</>);
}

Listings.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Listings

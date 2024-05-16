import Listing from '@/components/Listing'
import { ButtonWithConfirm  } from '@/components'
import { useEffect } from 'react';
import useListing from '@/contexts/listing/useListing'
import useAuthentication from "@/contexts/authentication/useAuthentication"

const UserListings = ({ }) => {
  const { listings, getAll, deleteListingById } = useListing()
  const { user } = useAuthentication() || {};

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.filter(l => l.userProfile.id === user.id).length === 0 && <p className="text-center"> Vous n&apos;avez pas encore d&apos;annonces</p>}
      {user && listings.filter(l => l.userProfile.id === user.id).map((listing) => {
        return (
          <Listing
            listing={listing}
            key={listing.id}>
            <ButtonWithConfirm className="mt-4 w-full" size="sm" onClick={() => { deleteListingById(listing.id) }}>Supprimer</ButtonWithConfirm>
          </Listing>
        )
      })}
    </div>
  )
}
export default UserListings;

import Listing from '@/components/Listing'
import { ButtonWithConfirm  } from '@/components'
import { useEffect } from 'react';
import useListing from '@/contexts/listing/useListing'
import useAuthentication from "@/contexts/authentication/useAuthentication"

const UserListings = ({ }) => {
  const { listings, getAll, deleteListingById, sellListingById } = useListing()
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
            <ButtonWithConfirm title='Confirmation' variant="success" confirmMessage={`Est-ce que cet offre a été vendu? Elle ne sera plus disponible!`} className="mt-4 w-full" size="sm" onClick={() => { sellListingById(listing.id); deleteListingById(listing.id); }}>Signaler comme vendu</ButtonWithConfirm>
            <ButtonWithConfirm className="mt-4 w-full" size="sm" variant="outline" onClick={() => { deleteListingById(listing.id)}}>Supprimer</ButtonWithConfirm>
          </Listing>
        )
      })}
    </div>
  )
}
export default UserListings;

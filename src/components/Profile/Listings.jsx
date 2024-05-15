import { Row, Figure } from "react-bootstrap";
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

  return(<pre>{JSON.stringify(listings)}</pre>)

  return (
      <Row className="mt-3">
        {listings.filter(l => l.userProfile.id === user.id).length === 0 && <p className="text-center"> Vous n&apos;avez pas encore d&apos;annonces</p>}
        {user && listings.filter(l => l.userProfile.id === user.id).map((listing) => {
          return (
            <Listing listing={listing} noProfile key={listing.id}>
              <ButtonWithConfirm onClick={() => { deleteListingById(listing.id) }}>Supprimer</ButtonWithConfirm>
            </Listing>
          )
        })}
      </Row>
  )
}
export default UserListings;

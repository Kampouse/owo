import ListingLayout from './Layout'

const Listing = (props) => {

  if(!props.listing) return null

  const { listing: { id, title, description, type, tags, userProfile, created_at, images, price }, children } = props

  return (
    <ListingLayout
      key={`listinglayout-${id}`}
      title={title}
      price={price}
      image={images && images.length > 0 && images[0]}
      description={description}
      userProfile={userProfile}
      footer={children}
      createdAt={created_at}
    />
  )
}

export default Listing;

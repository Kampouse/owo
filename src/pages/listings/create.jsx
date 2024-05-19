import { PrivateLayout } from "@/components/Layouts"
import { CreateListing  } from '@/components/Listing/Create'

const PageCreateListing = () => {
  return (
    <CreateListing />
  );
}

PageCreateListing.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default PageCreateListing

import ReactTimeAgo from 'react-time-ago'

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImgDialog } from "@/components/ui/img-dialog";

// TODO: make the image open in modal on click
const Listing = (props) => {

  if (!props.listing) return null

  const { listing: { id, title, description, type, tags, userProfile, created_at, images, price }, children } = props
  const image = images && images.length > 0 && images[0]

  return (
    <Card className="overflow-hidden relative">
      {!!userProfile &&
        <div className="absolute top-2 left-2 bg-white rounded-full p-1 flex items-center gap-2 z-10">
          <Avatar className="w-6 h-6 border">
            <AvatarImage alt="@shadcn" src={"https://api.multiavatar.com/" + userProfile.id + '.png'} />
            <AvatarFallback>{userProfile.username.substr(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-xs font-medium pr-2">@{userProfile.username}</div>
        </div>
      }
      <ImgDialog
        src={image}
        className=""
        width={400}
        alt={title}
      />
      <CardContent className="p-4 ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500 mt-2"><ReactTimeAgo date={new Date(created_at)} locale="fr" /></p>
            <p className="text-gray-500 mt-2">
              {description}
            </p>
          </div>
          {!!price ?
            <div className="text-gray-500 mt-2 text-right">{price}$</div>
            :
            <div className="text-green-500 mt-2 text-right">{price}$</div>
          }
        </div>

        {children}

      </CardContent>
    </Card>
  )
}

export default Listing;

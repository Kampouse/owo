import ReactTimeAgo from 'react-time-ago'

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// TODO: make the image open in modal on click
const ListingLayout = ({ title, image, description, footer, price, userProfile, createdAt }) => (
  <Card className="bg-white rounded-lg shadow-md overflow-hidden relative">
    <div className="absolute top-2 left-2 bg-white rounded-full p-1 flex items-center gap-2 z-10">
      <Avatar className="w-6 h-6 border">
        <AvatarImage alt="@shadcn" src={"https://api.multiavatar.com/" + userProfile.id + '.png'} />
        <AvatarFallback>{userProfile.username.substr(0,2)}</AvatarFallback>
      </Avatar>
      <div className="text-xs font-medium pr-2">@{userProfile.username}</div>
    </div>
    <img
      alt={title}
      className="w-full h-48 object-cover"
      height={300}
      src={image || "/placeholder.svg"}
      style={{
        aspectRatio: "400/300",
        objectFit: "cover",
      }}
      width={400}
    />
    <CardContent className="p-4 ">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mt-2"><ReactTimeAgo date={new Date(createdAt)} locale="fr" /></p>
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
      {footer}
    </CardContent>
  </Card>

);

export default ListingLayout;

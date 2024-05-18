import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";


const Badge = ({ name, label }) => (
  <div className="flex flex-col items-center space-y-4 w-48">
    <Avatar className="w-32 h-32">
      <AvatarImage src={`/badges/${name}.png`} />
      <AvatarFallback>{label}</AvatarFallback>
    </Avatar>
    <div className="text-center">
      <p className="text-sm font-medium leading-none">Béta Habitus🌿</p>
      <p className="text-sm text-muted-foreground">#account-creation-date // TODO: </p>
    </div>
  </div>
)

const Badges = ({}) => (
  <Card className="my-3">
    <CardHeader>
      <CardTitle>Badges</CardTitle>
      <CardDescription></CardDescription>
      <Separator />
    </CardHeader>
    <CardContent className="grid gap-6">
      <Badge name="habitus" label="Béta Habitus🌿" />
    </CardContent>
  </Card>
);

export default Badges;

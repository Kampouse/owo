import { Container, Row, Col, Tab, ListGroup } from "react-bootstrap";
import Badges from './Badges'
import UpdatePasswordForm from './UpdatePasswordForm'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import UserListings from './Listings'
import { Card, CardContent, CardDescription, CardImg, CardTitle, CardHeader } from "@/components/ui/card";


import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({}) => {
  const { user, logout } = useAuthentication();
  const router = useRouter()
  if (!user) { return (<span>LOADING PROFILE</span>) }

  return(
    <>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={"https://api.multiavatar.com/" + user.id + '.png'} />
                <AvatarFallback>OH</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-none">{user.username}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription></CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center space-y-4 w-48">
            <Avatar className="w-32 h-32">
              <AvatarImage src={`/badges/habitus.png`} />
              <AvatarFallback>Béta Habitus🌿</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-medium leading-none">Béta Habitus🌿</p>
              <p className="text-sm text-muted-foreground">#account-creation-date</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )


  return(
  <>
    <Tab.Container id="profile-tabs" defaultActiveKey="#badges">
    <Container>
    <Row>
      <Col md={4}>
        <Card className="mb-4">
          <Card.Body className="text-center">
            <Card.Img
              src={"https://api.multiavatar.com/" + user.id + '.png'}
              alt="avatar"
              className="rounded-circle"
              style={{ width: '100px' }}
            />
            <Card.Title className="mt-3 mb-0">{user.username}</Card.Title>
                  <p className="text-muted mb-1">👁️‍🗨️ {user.firstname} {user.name}</p>
              {/*
               <p className="text-muted mb-1">👑 Gamified Unlocked Title chosen</p>
                <p className="text-muted"> Rating: <br />⭐️⭐️⭐️⭐️⭐️</p>
               */}
                  <p className="text-muted">📍 Habitus🌿</p>
          </Card.Body>
        </Card>

          <ListGroup className="mb-4">
            <ListGroup.Item action href="#badges">
              🏆 Mes Badges
            </ListGroup.Item>
            <ListGroup.Item action href="#perso">
              🔐 Changer mon mot de passe
            </ListGroup.Item>
            {/*
            <ListGroup.Item action href="#life">
              Update Life context
            </ListGroup.Item>
            <ListGroup.Item action href="#privacy">
              Review Privacy settings
            </ListGroup.Item>
            <ListGroup.Item action href="#reviews">
              See my reviews
            </ListGroup.Item>
            <ListGroup.Item action href="#history">
              Transaction history
            </ListGroup.Item>
            <ListGroup.Item action href="#backer">
              Become a backer 🎉
            </ListGroup.Item> */}
            <ListGroup.Item action href="#my-listings">
              📋 Mes Annonces
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => logout(() => router.replace('/'))}>
              ⛔ Se déconnecter
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#badges">
              <Badges />
            </Tab.Pane>
            <Tab.Pane eventKey="#perso">
              <UpdatePasswordForm />
              </Tab.Pane>
              <Tab.Pane eventKey="#life">
                Update Life context
              </Tab.Pane>
              <Tab.Pane eventKey="#privacy">
                Review Privacy settings
              </Tab.Pane>
              <Tab.Pane eventKey="#reviews">
                See my reviews
              </Tab.Pane>
              <Tab.Pane eventKey="#history">
                Transaction history
              </Tab.Pane>
              <Tab.Pane eventKey="#backer">
                Become a backer 🎉
                </Tab.Pane>
                <Tab.Pane eventKey="#my-listings">
                  <UserListings />
                </Tab.Pane>
              <Tab.Pane eventKey="#logout">
                Logout
              </Tab.Pane>
          </Tab.Content>
      </Col>
    </Row>
    </Container>
    </Tab.Container>

  </>
)}

export default Profile;

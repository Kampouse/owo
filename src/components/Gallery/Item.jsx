import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago'

const borderTypes = {
  'don': 'primary',
  'vente': 'secondary',
  'pret': 'info',
  'service': 'success',
}

const getTypeColor = (type) => type && type.length ? borderTypes[type[0]] : 'primary'

const GalleryItem = ({ listing: { id, title, description, type, tags, userProfile, created_at, images }, children, noProfile }) => (
  <Card className="mb-3" border={getTypeColor(type)}>
    <Card.Header>
      <Card.Title border="primary">
        {title}
        &nbsp;{type?.map(label => {
          return (<Badge key={label} bg={borderTypes[label]} className="text-white">{label}</Badge>)
        })}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {description.split('\n').map(str => <p key={str}>{str}</p>)}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row className="align-items-center">
        {!noProfile &&
          <>
            <div style={{ width: '80px', display: 'flex', alignItems: 'center' }} className="mr-2">
              <Card.Img
                src={"https://api.multiavatar.com/" + userProfile.id + '.png'}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '80px', height: 'auto' }}
                fluid
              />
            </div>
            <Col>
            <span>{userProfile.username}</span><br />
            <span className="text-muted"><ReactTimeAgo date={created_at} locale="fr" /></span>
            </Col>
          </>
        }
        <Col className="text-right">
          {children}
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default GalleryItem;

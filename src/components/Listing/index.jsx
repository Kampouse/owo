import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago'
import ListingLayout from './Layout'

const borderTypes = {
  'don': 'primary',
  'vente': 'secondary',
  'pret': 'info',
  'service': 'success',
}

const Listing = ({ listing: { id, title, description, type, tags, userProfile, created_at, images, price }, children, noProfile }) => {
  return (
    <ListingLayout
      title={title}
      price={price}
      image={images && images.length > 0 && images[0]}
      description={description}
      footer={
        <Row className="align-items-center">
          {!noProfile &&
            <>
              <div style={{ width: '50px', display: 'flex', alignItems: 'center' }} className="mr-2">
                <Card.Img
                  src={"https://api.multiavatar.com/" + userProfile.id + '.png'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '50px', height: 'auto' }}
                />
              </div>
              <Col>
                <span>{userProfile.username}</span> <span className="text-muted">📍 Habitus🌿</span> <br />
                <span className="text-muted"><ReactTimeAgo date={new Date(created_at)} locale="fr" /></span>
              </Col>
            </>
          }
          <Col className="text-right">
            {children}
          </Col>
        </Row>
      }
    />
  )
}

export default Listing;

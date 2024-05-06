import { Row, Col, Card } from 'react-bootstrap';

const ListingLayout = ({ title, image, description, footer, price, left = "" }) => (
  <Card className="mb-3">
    <Card.Header>
      <Card.Title>
        {title}
          {!!price ?
            <span className="text-danger float-end">{price}$</span>
          :
            <span className="text-success float-end">{0}$</span>
          }
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Row>
        {!!image &&
          <Col sm={4} xs={12}>
            <Card.Img
              src={image}
            />
            {left}
          </Col>
        }
        <Col>
          <Card.Text>
            {description}
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      {footer}
    </Card.Footer>
  </Card>
);

export default ListingLayout;

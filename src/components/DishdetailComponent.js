import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  if (!dish) return <div></div>;

  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  if (!comments) return <div></div>;

  const commentList = comments.map(comment => (
    <li key={comment.id} className="mb-2">
      <p>{comment.comment}</p>
      <p>-- {comment.author}, {' '}
        {
          new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          }).format(new Date(comment.date))
        }
      </p>
    </li>
  ));

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {commentList}
      </ul>
    </div>
  );
}

function DishDetail(props) {
  const { dish } = props;

  if (!dish) return <div className="container"></div>;

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;

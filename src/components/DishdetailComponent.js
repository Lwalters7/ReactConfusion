import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

function RenderDish({ dish }) {
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
  if (!comments || comments.length === 0) {
    return <div>No comments available.</div>;
  }

  return (
    <ul className="list-unstyled">
      {comments.map((comment) => (
        <li key={comment.id} className="mb-3">
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {' '}
            {
              new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              }).format(new Date(Date.parse(comment.date)))
            }
          </p>
        </li>
      ))}
    </ul>
  );
}

function DishDetail({ dish }) {
  if (!dish) {
    return <div className="container"></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <RenderComments comments={dish.comments} />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;

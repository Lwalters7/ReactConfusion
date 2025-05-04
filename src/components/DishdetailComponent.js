import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';
import CommentForm from './CommentFormComponent';
import { baseUrl } from '../shared/baseUrl';

class DishDetail extends Component {
  renderDish(dish) {
    if (!dish) return <div></div>;

    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

renderComments(comments, addComment, dishId) {
  if (!comments || comments.length === 0) {
    return <div></div>;
  }

  const commentList = comments.map(comment => (
    <li key={comment.id} className="mb-2">
      <p>{comment.comment}</p>
      <p>
        -- {comment.author},{' '}
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).format(new Date(comment.date))}
      </p>
    </li>
  ));

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {commentList}
      </ul>
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}
  

render() {
  console.log("🤖 DishDetail props:", this.props);
  const { dish, comments, addComment, isLoading, errMess } = this.props;

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  }

  if (!dish) {
    return <div></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(comments, addComment, dish.id)}
        </div>
      </div>
    </div>
  );
}

  
}

export default DishDetail;

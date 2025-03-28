import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

class DishDetail extends Component {
  // ✅ Render dish card using a reusable function
  renderDish(dish) {
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

  renderComments(comments) {
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
      </div>
    );
  }
  

  render() {
    const { dish, comments } = this.props;
  
    if (!dish) return <div></div>;
  
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(comments)}
        </div>
      </div>
    );
  }
  
}

export default DishDetail;

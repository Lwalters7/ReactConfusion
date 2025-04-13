import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  CardText
} from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

function Menu(props) {
  const { dishes, isLoading, errMess } = props.dishes;
  const [selectedDish, setSelectedDish] = useState(null);

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  // ✅ Handle error state
  if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  const menu = dishes.map((dish) => (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <RenderMenuItem dish={dish} onClick={setSelectedDish} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{menu}</div>

      {selectedDish && (
        <div className="row mt-4">
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top src={selectedDish.image} alt={selectedDish.name} />
              <CardBody>
                <CardTitle>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {props.comments
                .filter((c) => c.dishId === selectedDish.id)
                .map((comment) => (
                  <li key={comment.id}>
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
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;

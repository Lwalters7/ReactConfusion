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
import DishDetail from './DishdetailComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish)}>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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
        <DishDetail
        dish={selectedDish}
        comments={props.comments.filter((c) => c.dishId === selectedDish.id)}
        addComment={props.addComment}
        resetFeedbackForm={props.resetFeedbackForm}
      />
      )}
    </div>
  );
}

export default Menu;

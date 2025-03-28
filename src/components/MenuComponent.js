import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle
} from 'reactstrap';
import DishDetail from './DishdetailComponent';
import { COMMENTS } from '../shared/comments';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    const selectedComments = this.state.selectedDish
      ? COMMENTS.filter(c => c.dishId === this.state.selectedDish.id)
      : [];

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <DishDetail
          dish={this.state.selectedDish}
          comments={selectedComments}
        />
      </div>
    );
  }
}

export default Menu;

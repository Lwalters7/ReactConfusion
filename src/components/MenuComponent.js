import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  // Select Dish
  onDishSelect(dish) {
    console.log("Dish selected:", dish); // ✅ Debugging log
    this.setState({ selectedDish: dish });
  }

  // Render Dish Details
  renderDish(dish) {
    console.log("Rendering dish:", dish); // ✅ Debugging log
    if (dish !== null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    console.log("Menu props:", this.props.dishes); // ✅ Debugging log

    // Ensure `dishes` is an array before mapping
    if (!this.props.dishes || !Array.isArray(this.props.dishes)) {
      console.error("❌ Error: `dishes` is not an array!", this.props.dishes);
      return <h3>Error loading dishes</h3>;
    }

    // Mapping over dishes
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

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;

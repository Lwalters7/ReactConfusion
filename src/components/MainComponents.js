import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // ✅ use v6 syntax
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Header />

        {/* ✅ Routing setup with Routes and Route (v6) */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/menu"
            element={
              <Menu
                dishes={this.state.dishes}
                onClick={(dishId) => this.onDishSelect(dishId)}
              />
            }
          />
          <Route
            path="/menu/:dishId"
            element={
              <DishDetail
                dish={this.state.dishes.filter(
                  (dish) => dish.id === this.state.selectedDish
                )[0]}
              />
            }
          />
          {/* Redirect any unmatched routes to /home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/menu"
            element={
              <Menu
                dishes={this.state.dishes}
              />
            }
          />
          <Route path="/contactus" element={<Contact />} />
          {/* You can add the DishDetail route when you're ready */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;

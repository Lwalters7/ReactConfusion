import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

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

// ✅ Functional wrapper to handle URL param in v6
const DishWithIdWrapper = ({ dishes, comments }) => {
  const { dishId } = useParams();
  const dish = dishes.find(d => d.id === parseInt(dishId, 10));
  const filteredComments = comments.filter(c => c.dishId === parseInt(dishId, 10));

  return <DishDetail dish={dish} comments={filteredComments} />;
};

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
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} />} />
          <Route
            path="/menu/:dishId"
            element={<DishWithIdWrapper dishes={this.state.dishes} comments={this.state.comments} />}
          />
          <Route path="/contactus" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;

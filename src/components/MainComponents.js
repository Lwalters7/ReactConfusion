import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

const DishWithIdWrapper = ({ dishes, comments }) => {
  const { dishId } = useParams();
  const dish = dishes.find(d => d.id === parseInt(dishId, 10));
  const filteredComments = comments.filter(c => c.dishId === parseInt(dishId, 10));

  return <DishDetail dish={dish} comments={filteredComments} />;
};

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

class Main extends Component {
  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter(dish => dish.featured)[0]}
          promotion={this.props.promotions.filter(promo => promo.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <div>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu dishes={this.props.dishes} />} />
          <Route
            path="/menu/:dishId"
            element={<DishWithIdWrapper dishes={this.props.dishes} comments={this.props.comments} />}
          />
          <Route path="/contactus" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);

import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { addComment, fetchDishes } from '../redux/ActionCreators';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

const DishWithIdWrapper = ({ dishes, isLoading, errMess, comments, addComment }) => {
  const { dishId } = useParams();
  const dish = dishes.find(d => d.id === parseInt(dishId, 10));
  const filteredComments = comments.filter(c => c.dishId === parseInt(dishId, 10));

  return (
    <DishDetail
      dish={dish}
      isLoading={isLoading}
      errMess={errMess}
      comments={filteredComments}
      addComment={addComment}
    />
  );
};

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes())
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route
  path="/menu"
  element={
    <Menu
      dishes={this.props.dishes}
      comments={this.props.comments}
    />
  }
/>
            <Route
              path="/menu/:dishId"
              element={
                <DishWithIdWrapper
                  dishes={this.props.dishes.dishes}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={this.props.comments}
                  addComment={this.props.addComment}
                />
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

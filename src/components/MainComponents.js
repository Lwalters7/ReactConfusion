import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { addComment, fetchDishes } from '../redux/ActionCreators';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

function DishWithIdWrapperWrapper(props) {
  const { dishId } = useParams();
  const dish = props.dishes.dishes.find(d => d.id === parseInt(dishId, 10));
  const filteredComments = props.comments.filter(c => c.dishId === parseInt(dishId, 10));

  return (
    <DishDetail
      dish={dish}
      isLoading={props.dishes.isLoading}
      errMess={props.dishes.errMess}
      comments={filteredComments}
      addComment={props.addComment}     
      resetFeedbackForm={props.resetFeedbackForm} 
    />
  );
}

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
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')) 
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
                  addComment={this.props.addComment}
                />
              }
            />
            <Route
              path="/menu/:dishId"
              element={<DishWithIdWrapperWrapper {...this.props} />}
            />
            <Route
              path="/contactus"
              element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

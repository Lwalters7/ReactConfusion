import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { fetchLeaders } from '../redux/ActionCreators';
import { postFeedback } from '../redux/ActionCreators';

import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

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
      postComment={this.props.postComment}
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
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
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
              element={<Contact postFeedback={this.props.postFeedback} />
            }
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

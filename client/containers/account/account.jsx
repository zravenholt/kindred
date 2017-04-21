import React from 'react';
import Cookies from 'js-cookie';
import NavLoggedIn from '../../components/navLoggedIn.jsx';
import AccountInfo from './accountInfo.jsx';
import checkToken from '../login-signup/authHelpers.js';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {actionSetUserProfile} from '../../actions/actionSetUserProfile.js';
import '../../styles/index.css';

// https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
class Account extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      unauthorized: null,
    };
    this.props.actionSetUserProfile(this.props.user.userObj);
    this.checkToken = checkToken.bind(this);
  }

  componentDidMount() {
    let cookies = Cookies.getJSON();
    for (var key in cookies) {
      if (key !== 'pnctest') {
        this.setState({
          cookie: {
            Username: cookies[key].Username,
            Token: cookies[key].Token
          }
        });
      }
    } 
    this.checkToken();
  }

  render() {
    return (
      <div className="account-container">
        <div>{this.state.unauthorized === true ? <Redirect to="/login" /> : this.state.unauthorized === false ? this.state.redirect === true ? <Redirect to="/survey"/> : null : null}</div>
        <NavLoggedIn/>
        <div className="survey-container">
          <AccountInfo/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.userReducer,
    surveyFromAccountPage: state.surveyFromAccountPage,
    userProfileReducer: state.userProfileReducer
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({actionSetUserProfile: actionSetUserProfile}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
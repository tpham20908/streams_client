import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '385488254111-9kjrlek5gbp8ad83j9r8gsi0hn1v9gk4.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.props.isSignedIn);
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    isSignedIn ? this.props.signIn() : this.props.signOut();
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={() => this.auth.signOut()}>
          <i className="google icon" /> Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui green google button" onClick={() => this.auth.signIn()}>
          <i className="google icon" /> Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ isSignedIn: auth.isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
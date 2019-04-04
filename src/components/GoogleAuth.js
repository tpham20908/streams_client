import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '385488254111-9kjrlek5gbp8ad83j9r8gsi0hn1v9gk4.apps.googleusercontent.com',
        scope: 'email'
      })
    })
  }

  render() {
    return (
      <div>Google Auth</div>
    )
  }
}

export default GoogleAuth;
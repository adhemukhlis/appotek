import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { OFFLINE_MODE, USER_ROLE, UserRole } from "../config";
import { firebaseRef_setUSER } from "../../firebase/firebaseRef";
import { GoogleLogin } from 'react-google-login';
import { LoginStyle, LoginTitle } from "../style";
import { Button } from 'semantic-ui-react';
class Login extends Component {
	responseGoogle = ( response ) => {
		console.log( response.profileObj );
		firebaseRef_setUSER( response.profileObj.googleId ).once('value', snapshot => {
			if (snapshot.exists( )) {
				console.log( snapshot.val().role );
				this
					.props
					.userAuth(snapshot.val().role )
			} else {
				firebaseRef_setUSER( response.profileObj.googleId ).set({
					...response.profileObj,
					role: '0',
					nik: '0'
				})
			}
		})
	}
	errorLogin = ( ) => {
		console.log( 'error' )
	}
	render( ) {
		const { loggedAs } = this.props;
		if (loggedAs === UserRole[0] || loggedAs === UserRole[1]) {
			return <Redirect push to='/pemasukan'/>
		}
		if (loggedAs === UserRole[2]) {
			return <Redirect push to='/transaksi'/>
		}
		return (
			<div style={LoginStyle}>
				<h1 style={LoginTitle}>APPOTEK</h1>{OFFLINE_MODE
					? (
						<Button basic onClick={( ) => this.props.userAuth( USER_ROLE )}>
							Login Dev
						</Button>
					)
					: (
						<GoogleLogin clientId="759340461501-u4bk7hcjlqnke6nfqg4gp404lhdsd7bm.apps.googleusercontent.com" onSuccess={this.responseGoogle} onFailure={this.errorLogin}>
							<b>Login with Google</b>
						</GoogleLogin>
					)}</div>
		)
	}
}
export default Login;
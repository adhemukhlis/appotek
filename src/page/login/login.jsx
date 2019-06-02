import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "./login.css";
import { UserRole } from "../config";
import { BrandLogo, TextLogo } from "../component/logo";
import { firebaseRef_setUSER } from "../../firebase/firebaseRef";
import { GoogleLogin } from 'react-google-login';
import { LoginStyle, LoginTitle } from "../style";
import { getSession, setSession } from "../component/func_lib";
class Login extends Component {
	userAuth = ( data ) => {
		this
			.props
			.userAuth({ role: data.role, name: data.name, imageUrl: data.imageUrl });
		setSession('google', JSON.stringify( data ))
	}
	componentDidMount( ) {
		const sessionData = getSession( 'google' );
		if ( sessionData !== null ) {
			this.userAuth(JSON.parse( sessionData ))
		}
	}
	responseGoogle = ( response ) => {
		firebaseRef_setUSER( response.profileObj.googleId ).once('value', snapshot => {
			if (snapshot.exists( )) {
				const data = snapshot.val( );
				this.userAuth( data )
			} else {
				firebaseRef_setUSER( response.profileObj.googleId ).set({
					...response.profileObj,
					role: '0',
					nik: '0',
					cabang: '0'
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
			<div id="entry-page" style={LoginStyle}>
				<div id='panel'><BrandLogo width="20vh"/>
					<div style={LoginTitle}><TextLogo width="30vh"/></div>
					<GoogleLogin theme='dark' clientId="759340461501-u4bk7hcjlqnke6nfqg4gp404lhdsd7bm.apps.googleusercontent.com" onSuccess={this.responseGoogle} onFailure={this.errorLogin}>
						<b>Login with Google</b>
					</GoogleLogin>
				</div>
			</div>
		)
	}
}
export default Login;
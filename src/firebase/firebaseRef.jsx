import firebase from 'firebase';
const config = {
	apiKey: "AIzaSyAsqkUcNYLmolN1x3DwDw7B_UjKz_ZdwAg",
	authDomain: "appotek-ppl.firebaseapp.com",
	databaseURL: "https://appotek-ppl.firebaseio.com",
	projectId: "appotek-ppl",
	storageBucket: "appotek-ppl.appspot.com",
	messagingSenderId: "759340461501"
};
firebase.initializeApp( config );
export const rootRef = firebase
	.database( )
	.ref( );
export const firebaseRef_USER = rootRef.child( 'user' );
export const firebaseRef_GAJI = rootRef.child( 'gaji' );
export const firebaseRef_setUSER = ( googleid ) => firebaseRef_USER.child( googleid );
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
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
export const rootRefStore = firebase
	.storage( )
	.ref( "images" );
export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;
export const firebaseRef_USER = rootRef.child( 'user' );
export const firebaseRef_TRANSAKSI = rootRef.child( 'transaksi' );
export const firebaseRef_TRANSAKSI_ITEM = rootRef.child( 'transaksi_item' );
export const firebaseRef_SEARCH = rootRef.child( 'search' );
export const firebaseRef_GAJI = rootRef.child( 'gaji' );
export const firebaseRef_CABANG = rootRef.child( 'cabang' );
export const firebaseRef_OPERASIONAL = rootRef
	.child( 'pengeluaran' )
	.child( 'operasional' );
export const firebaseRef_PENGELUARAN =(start,end)=> (!start&&!end)?rootRef.child( 'pengeluaran' ): rootRef.child( 'pengeluaran' ).orderByChild('datetime').startAt(start).endAt(end);
export const firebaseRef_CABANG_BARANG = ( key ) => rootRef
	.child( 'cabang-barang' )
	.child( key );
export const firebaseRef_BARANG = rootRef.child( 'barang' );
export const firebaseRef_setUSER = ( googleid ) => firebaseRef_USER.child( googleid );
export const firebaseRef_getTRANSAKSI_CABANG = ( cabang ) => firebaseRef_TRANSAKSI
	.orderByChild( 'cabang' )
	.equalTo( cabang );
export const AKUN_SIGNUP = ( profileObj ) => {
	firebaseRef_setUSER( profileObj.googleId ).set({
		...profileObj,
		role: 0,
		nik: 0,
		cabang: 0
	})
}
export const AKUN_EDIT = ( googleId, content ) => {
	firebaseRef_setUSER( googleId ).update( content )
}
export const AKUN_DELETE = ( googleId ) => {
	firebaseRef_setUSER( googleId ).remove( )
}
export const GAJI_ADD = ( content ) => {
	firebaseRef_GAJI.push( content )
}
export const GAJI_EDIT = ( id, content ) => {
	firebaseRef_GAJI
		.child( id )
		.update( content )
}
export const GAJI_DELETE = ( id ) => {
	firebaseRef_GAJI
		.child( id )
		.remove( )
}
export const CABANG_BARANG_ADD = ( id_barang, cabang, content ) => {
	console.log( cabang );
	firebaseRef_CABANG_BARANG( cabang )
		.child( id_barang )
		.set({
			id: id_barang,
			...content
		})
}
export const CABANG_BARANG_EDIT = ( id, cabang, content ) => {
	firebaseRef_CABANG_BARANG( cabang )
		.child( id )
		.update( content )
}
export const CABANG_BARANG_DELETE = ( id, cabang ) => {
	firebaseRef_CABANG_BARANG( cabang )
		.child( id )
		.remove( )
}
export const PENGELUARAN_ADD = ( content ) => {
	firebaseRef_PENGELUARAN.push( content )
}
export const PENGELUARAN_EDIT = ( id, content ) => {
	firebaseRef_PENGELUARAN
		.child( id )
		.update( content )
}
export const PENGELUARAN_DELETE = ( id ) => {
	firebaseRef_PENGELUARAN
		.child( id )
		.remove( )
}
export const BARANG_ADD = ( id, content ) => {
	firebaseRef_BARANG
		.child( id )
		.set({
			id: id,
			...content
		})
}
export const BARANG_EDIT = ( id, content ) => {
	firebaseRef_BARANG
		.child( id )
		.update( content )
}
export const BARANG_DELETE = ( id ) => {
	firebaseRef_BARANG
		.child( id )
		.remove( )
}
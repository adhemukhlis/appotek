export const getSession = ( header ) => {
	return window
		.sessionStorage
		.getItem( header )
}
export const setSession = ( header, value ) => {
	return window
		.sessionStorage
		.setItem( header, value )
}
export const delSession = ( header ) => {
	return window
		.sessionStorage
		.removeItem( header )
}
export const clearSession = ( ) => {
	return window
		.sessionStorage
		.clear( )
}
export const UANG = ( uang ) => {
	return "Rp" + Number( uang )
		.toFixed( 0 )
		.replace( /./g, function ( c, i, a ) {
			return i > 0 && c !== "." && ( a.length - i ) % 3 === 0
				? "." + c
				: c
		})
}
export const SUM = ( arrdata ) => {
	return arrdata.reduce( ( a, b ) => a + b, 0 )
}
export const timestamp = ( ) => {
	const date = new Date( );
	const year = date
		.getFullYear( )
		.toString( );
	const month = date.getMonth( ) < 10
		? '0' + date
			.getMonth( )
			.toString( )
		: date
			.getMonth( )
			.toString( );
	const _date = date.getDate( ) < 10
		? '0' + date
			.getDate( )
			.toString( )
		: date
			.getDate( )
			.toString( );
	const hours = date.getHours( ) < 10
		? '0' + date
			.getHours( )
			.toString( )
		: date
			.getHours( )
			.toString( );
	const minutes = date.getMinutes( ) < 10
		? '0' + date
			.getMinutes( )
			.toString( )
		: date
			.getMinutes( )
			.toString( );
	const seconds = date.getSeconds( ) < 10
		? '0' + date
			.getSeconds( )
			.toString( )
		: date
			.getSeconds( )
			.toString( );
	return ( year + month + _date + hours + minutes + seconds )
}
export const FULLDATE = ( ) => {
	const date = new Date( );
	return date.getFullYear( ) + '-' + date.getMonth( ) + '-' + date.getDate( ) + ' ' + date.getHours( ) + ':' + date.getMinutes( ) + ':' + date.getSeconds( )
}
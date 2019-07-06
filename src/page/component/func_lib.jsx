import moment from "moment";
import { UserRole } from "../config";
export const DateToISO = (thn, bln, tgl)=>{
	//year, month, day, hours, minutes and seconds
	
	// const DateValDUMMY = new Date(2017, 9-1, 0, 0, 0, 0).getTime()
	// console.log(DateValDUMMY,moment( DateValDUMMY ).format( "DD/MM/YYYY" ));
	// console.log(moment( 1562010633323 ).format( "DD/MM/YYYY" ));
	const DateVal = new Date(thn, bln-1, tgl, 0, 0, 0).getTime()
	return DateVal
} 
export const ShortDate = ( dateVal ) => {
	return moment( dateVal ).format( "DD/MM/YYYY" )
}
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
export const FULLDATE = ( date) => {
	// const date = new Date( );
	return moment(date).format('llll')
	// return date.getFullYear( ) + '-' + date.getMonth( ) + '-' + date.getDate( ) + ' ' + date.getHours( ) + ':' + date.getMinutes( ) + ':' + date.getSeconds( )
}
export const VALIDATION_ERROR_ATT = ( user ) => {
	return ( !UserRole.includes( user.role ) || user.cabang === 0 || user.nik === 0 )
}
export const VALIDATION_PAYMENT_PROCESS = (tunai, harga) => {
	return (tunai === ''||tunai<harga)
}
export const VALIDATION_NIK = ( user ) => {
	return ( user.nik === 0
		? 'Illegal'
		: user.nik )
}

export const VALIDATION_CP_AKUN = (data) =>{
	return !(data.nik!==''&&data.name!=='')
}
export const VALIDATION_CP_GAJI = (data) =>{
	return !(data.gaji!=='')
}
export const VALIDATION_BRG = (exist,new_data,data) =>{
	return new_data?!(data.id!==''&&data.nama_barang!==''&&data.desc!==''&&data.img!==null&&!exist):!(data.id!==''&&data.nama_barang!==''&&data.desc!==''&&data.img!==null)
}
export const VALIDATION_BRG_CABANG = (data) =>{
	return !(data.stok!==''&&data.harga!=='')
}
export const VALIDATION_PENGELUARAN = (data) =>{
	return !(data.pembelian!==''&&data.cabang!==''&&data.qty!==''&&data.satuan!==''&&data.harga!==''&&data.jenis_pembelian!=='')
}
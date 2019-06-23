import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PageLogin from "../page/login/login";
import PageTransaksi from "../page/transaksi/transaksi";
import PageTransaksiData from "../page/transaksi/transaksi_data";
import PagePengeluaran from "../page/pengeluaran/pengeluaran_panel";
import PagePresensi from "../page/presensi/presensi";
import PageDataBarang from "../page/databarang/data_barang_panel";
import PagePemasukan from "../page/pemasukan/pemasukan";
import PageControlPanel from "../page/controlpanel/controlpanel";
import Dev from "../page/dev/dev";
import Scanner from "../page/scanner/scanner";
import { UserRole, Path } from "../page/config";
import SideBar from "../page/component/sidebar";
import { delSession, getSession } from '../page/component/func_lib';
class App extends Component {
	state = {
		loggedAs: null,
		name: null,
		imageUrl: null,
		cabang: null,
		nik: null
	};
	componentWillMount( ) {
		const date = new Date("2018-08-22T00:00:00+0000" ).getTime( );
		console.log(date);
		const sessionData = getSession( 'google' );
		console.log( sessionData );
		if ( sessionData !== null ) {
			console.log( 'yes' );
			this.userAuth(JSON.parse( sessionData ))
		}
	}
	userAuth = ( data ) => {
		this.setState({ cabang: data.cabang, loggedAs: data.role, name: data.name, imageUrl: data.imageUrl, nik: data.nik })
	};
	logout = ( ) => {
		this.setState({ loggedAs: null });
		delSession( 'google' )
	}
	render( ) {
		const { loggedAs, name, imageUrl, cabang, nik } = this.state;
		const user = {
			nik: nik,
			role: loggedAs,
			name: name,
			imageUrl: imageUrl,
			cabang: cabang
		};
		return (
			<div>
				<SideBar user={user} logout={this.logout}>
					<Route path={Path.Dev} component= { ( ) =>< Dev />}/>
					<Route path={Path.Scanner} component= { ( ) =>< Scanner legalAccess={this.state.loggedAs===UserRole[2]} userdata={user} />}/>
					<Route path={Path.PageLogin} exact component= { ( ) =>< PageLogin userAuth={this.userAuth} loggedAs={this.state.loggedAs}/>}/>
					<Route path={Path.PageTransaksi} component= { ( ) =>< PageTransaksi legalAccess={this.state.loggedAs===UserRole[2]} userdata={user} />}/>
					<Route path={Path.PagePengeluaran} component= { ( ) =>< PagePengeluaran legalAccess = {this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]} />}/>
					<Route path={Path.PageTransaksiData} component= { ( ) =>< PageTransaksiData legalAccess = {this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]} />}/>
					<Route path={Path.PagePresensi} component= { ( ) =>< PagePresensi legalAccess = { this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1] } /> }/>
					<Route path={Path.PageControlPanel} component= { ( ) =>< PageControlPanel legalAccess = { this.state.loggedAs === UserRole[0] } /> }/>
					<Route path={Path.PageDataBarang} component= { ( ) =>< PageDataBarang legalAccess = { this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1] } /> }/>
					<Route path={Path.PagePemasukan} component= { ( ) =>< PagePemasukan legalAccess = { this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1] } /> }/>
				</SideBar>
			</div>
		)
	}
}
export default App;
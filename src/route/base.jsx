import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PageLogin from "../page/login/login";
import PageTransaksi from "../page/transaksi/transaksi";
import PagePengeluaran from "../page/pengeluaran/pengeluaran_panel";
import PagePresensi from "../page/presensi/presensi";
import PageDataBarang from "../page/databarang/data_barang_panel";
import PagePemasukan from "../page/pemasukan/pemasukan";
import PageControlPanel from "../page/controlpanel/controlpanel";
import { UserRole, Path } from "../page/config";
import SideBar from "../page/component/sidebar";
import { delSession } from '../page/component/func_lib';
class App extends Component {
	state = {
		loggedAs: null,
		name: null,
		imageUrl: null
	};
	userAuth = ( data ) => {
		this.setState({ loggedAs: data.role, name: data.name, imageUrl: data.imageUrl })
	};
	logout = ( ) => {
		this.setState({ loggedAs: null });
		delSession( 'google' )
	}
	render( ) {
		const user = {
			role: this.state.loggedAs,
			name: this.state.name,
			imageUrl: this.state.imageUrl
		};
		return (
			<div>
				<SideBar user={user} logout={this.logout}>
					<Route path={Path.PageLogin} exact component= { ( ) =>< PageLogin userAuth={this.userAuth} loggedAs={this.state.loggedAs}/>}/>
					<Route path={Path.PageTransaksi} component= { ( ) =>< PageTransaksi legalAccess={this.state.loggedAs===UserRole[2]} />}/>
					<Route path={Path.PagePengeluaran} component= { ( ) =>< PagePengeluaran legalAccess = {this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]} />}/>
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
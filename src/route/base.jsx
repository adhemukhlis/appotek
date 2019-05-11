import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from "../page/login/login";
import Transaksi from "../page/transaksi/transaksi";
import Pengeluaran from "../page/pengeluaran/pengeluaran";
import Presensi from "../page/presensi/presensi";
import Operasional from "../page/pengeluaran/operasional";
import DataBarang from "../page/databarang/data_barang";
import Pemasukan from "../page/pemasukan/pemasukan";
import ControlPanel from "../page/controlpanel/controlpanel";
import { UserRole } from "../page/config";
import SideBar from "../page/component/sidebar";
class App extends Component {
	state = {
		loggedAs: null
	};
	userAuth = ( role ) => {
		this.setState({ loggedAs: role });
		console.log( role )
	};
	render( ) {
		const PATH = [ < Route path = "/pengeluaran" component = {
				( ) =>< Pengeluaran legalAccess = {
					this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]
				} />
			} />, < Route path = "/presensi" component = {
				( ) =>< Presensi legalAccess = {
					this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]
				} />
			} />, < Route path = "/operasional" component = {
				( ) =>< Operasional legalAccess = {
					this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]
				} />
			} />, < Route path = "/control" component = {
				( ) =>< ControlPanel legalAccess = {
					this.state.loggedAs === UserRole[0]
				} />
			} />, < Route path = "/barang" component = {
				( ) =>< DataBarang legalAccess = {
					this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]
				} />
			} />, < Route path = "/pemasukan" component = {
				( ) =>< Pemasukan legalAccess = {
					this.state.loggedAs === UserRole[0] || this.state.loggedAs === UserRole[1]
				} />
			} />
		];
		return (
			<div>
				<Route path="/" exact component= { ( ) =>< Login userAuth={this.userAuth} loggedAs={this.state.loggedAs}/>}/>
				<Route path="/transaksi" component= { ( ) =>< Transaksi legalAccess={this.state.loggedAs===UserRole[2]} />}/>
				{this.state.loggedAs !== UserRole[2] 
					? (
						<SideBar user={this.state.loggedAs}>{PATH}</SideBar>
					)
					: PATH}</div>
		)
	}
}
export default App;
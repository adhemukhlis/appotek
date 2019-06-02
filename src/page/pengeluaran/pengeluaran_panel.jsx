import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Tab, Header } from 'semantic-ui-react';
import Pengeluaran from "./component/pengeluaran";
import Pengadaan from "./component/pengadaan";
import { PanelHeader } from '../style';
class PanelPengeluaran extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		// const panes = [
		// 	{
		// 		menuItem: 'Operasional',
		// 		render: ( ) => (
		// 			<Tab.Pane><Operasional/></Tab.Pane>
		// 		)
		// 	}, {
		// 		menuItem: 'Barang',
		// 		render: ( ) => (
		// 			<Tab.Pane><Pengadaan/></Tab.Pane>
		// 		)
		// 	}
		// ];
		return (
			<div>
				<div style={PanelHeader}>
					<Header as='h1'>
						PENGELUARAN
					</Header>
				</div>
				<Pengeluaran/>
				{/* <Tab panes={panes}/> */}
			</div>
		)
	}
}
export default PanelPengeluaran;
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Tab, Header } from 'semantic-ui-react';
import Operasional from "./component/operasional";
import StokBarang from "./component/stock_barang";
import { PanelHeader } from '../style';
class PanelPengeluaran extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const panes = [
			{
				menuItem: 'Operasional',
				render: ( ) => (
					<Tab.Pane><Operasional/></Tab.Pane>
				)
			}, {
				menuItem: 'Barang',
				render: ( ) => (
					<Tab.Pane><StokBarang/></Tab.Pane>
				)
			}
		];
		return (
			<div>
				<div style={PanelHeader}>
					<Header as='h1'>
						PENGELUARAN
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default PanelPengeluaran;
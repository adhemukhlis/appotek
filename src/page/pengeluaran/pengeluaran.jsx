import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Tab, Header } from 'semantic-ui-react';
import Operasional from "./operasional";
import StokBarang from "./stock_barang";
class Pengeluaran extends Component {
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
				<div style={{
					margin: '10vh',
					textAlign: 'center'
				}}>
					<Header as='h1'>
						Pengeluaran
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default Pengeluaran;
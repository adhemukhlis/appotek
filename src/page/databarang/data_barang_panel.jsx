import React, { Component } from 'react';
import DataBarang from "./component/data_barang";
import { Tab, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
class PanelBarang extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const panes = [
			{
				menuItem: 'Data Barang',
				render: ( ) => (
					<Tab.Pane><DataBarang/></Tab.Pane>
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
						Data Barang
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default PanelBarang;
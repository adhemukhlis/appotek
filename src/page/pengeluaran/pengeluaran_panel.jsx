import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Header } from 'semantic-ui-react';
import Pengeluaran from "./component/pengeluaran";
import { PanelHeader } from '../style';
class PanelPengeluaran extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		return (
			<div>
				<div style={PanelHeader}>
					<Header as='h1'>
						PENGELUARAN
					</Header>
				</div>
				<Pengeluaran/>
			</div>
		)
	}
}
export default PanelPengeluaran;
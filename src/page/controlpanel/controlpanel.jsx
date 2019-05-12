import React, { Component } from 'react';
import { Tab, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import Akun from "./component/akun";
import Gaji from "./component/gaji";
class Pengeluaran extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const panes = [
			{
				menuItem: 'Akun',
				render: ( ) => (
					<Tab.Pane><Akun/></Tab.Pane>
				)
			}, {
				menuItem: 'Gaji',
				render: ( ) => (
					<Tab.Pane><Gaji/></Tab.Pane>
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
						Control Panel
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default Pengeluaran;
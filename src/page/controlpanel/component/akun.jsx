import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { firebaseRef_USER } from "../../../firebase/firebaseRef";
import TableAkun from "./akun_table";
import AkunEdit from "./akun_edit";
import { PanelContainer, PanelHeader } from '../../style';
class Operasional extends Component {
	state = {
		users: [],
		open: false,
		email: null,
		name: null,
		nik: null,
		role: null,
		googleId: null,
		confirm: null
	};
	componentDidMount( ) {
		firebaseRef_USER.on('value', snap => {
			const users = [ ];
			snap.forEach(shot => {
				users.push({
					...shot.val( )
				})
			});
	
			this.setState({ users: users })
		})
	}
	update = ( ) => {
		const content = {
			email: this.state.email,
			nik: this.state.nik,
			name: this.state.name,
			role: this.state.role
		};
		firebaseRef_USER
			.child( this.state.googleId )
			.update( content )
			.then(( ) => {
				console.log( "Data saved successfully." )
			})
			.catch(( error ) => {
				console.log( "Data could not be saved." + error )
			})
	}
	delete = ( ) => {
		firebaseRef_USER
			.child( this.state.googleId )
			.remove( );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	show = ( user ) => this.setState({
		googleId: user.googleId,
		email: user.email,
		nik: user.nik,
		name: user.name,
		role: user.role,
		open: true
	});
	close = ( ) => this.setState({ open: false });
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	render( ) {
		const { users } = this.state;
		return (
			<div style={PanelContainer}>
				<AkunEdit handleDropDownChange={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete}_onSave={this.handleConfirm} _placeholder='email' _close={this.close} _keydelete={this.state.email} _headername={this.state.name} _open={this.state.open} _data={{
					googleId: this.state.googleId,
					email: this.state.email,
					nik: this.state.nik,
					name: this.state.name,
					role: this.state.role
				}}/>
				<Header style={PanelHeader} as='h1'>Akun</Header>
				<TableAkun _data={users} _show={this.show}/>
			</div>
		)
	}
}
export default Operasional;
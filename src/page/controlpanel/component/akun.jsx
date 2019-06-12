import React, { Component } from 'react';
import { searchArrayTable } from "array-table-search";
import { Header } from 'semantic-ui-react';
import { firebaseRef_USER } from "../../../firebase/firebaseRef";
import TableAkun from "./akun_table";
import AkunEdit from "./akun_edit";
import { PanelContainer, PanesHeader } from '../../style';
class Operasional extends Component {
	state = {
		users: [],
		open: false,
		selected_email: null,
		selected_name: null,
		selected_cabang: null,
		selected_nik: null,
		selected_role: null,
		selected_googleId: null,
		search: null
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
		});
	}
	update = ( ) => {
		const content = {
			email: this.state.selected_email,
			nik: this.state.selected_nik,
			name: this.state.selected_name,
			role: this.state.selected_role,
			cabang: this.state.selected_cabang
		};
		firebaseRef_USER
			.child( this.state.selected_googleId )
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
			.child( this.state.selected_googleId )
			.remove( );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	show = ( user ) => this.setState({
		selected_googleId: user.googleId,
		selected_email: user.email,
		selected_nik: user.nik,
		selected_name: user.name,
		selected_role: user.role,
		selected_cabang: user.cabang,
		open: true
	});
	close = ( ) => this.setState({ open: false });
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	render( ) {
		const { users, search } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( users, searchOptionTable );
		return (
			<div style={PanelContainer}>
				<AkunEdit _onSave={this.handleConfirm}  handleDropDownChange={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='email' _close={this.close} _keydelete={this.state.email} _headername={this.state.name} _open={this.state.open} _data={{
					googleId: this.state.selected_googleId,
					email: this.state.selected_email,
					nik: this.state.selected_nik,
					name: this.state.selected_name,
					role: this.state.selected_role,
					cabang: this.state.selected_cabang
				}}/>
				<Header style={PanesHeader} as='h1'>Akun</Header>
				<TableAkun _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default Operasional;
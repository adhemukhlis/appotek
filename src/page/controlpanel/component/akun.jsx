import React, { Component } from 'react';
import {
	Form,
	Header,
	Button,
	Table,
	Icon,
	Modal,
	Input,
	Divider,
	Dropdown,
	Popup
} from 'semantic-ui-react';
import { firebaseRef_USER } from "../../../firebase/firebaseRef";
import { UserRole } from "../../config";
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
			console.log( users );
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
	handleConfirmDeleteChange = (e, { value }) => {
		this.setState({ confirm: value });
		console.log( value )
	};
	handleChange = (e, { name, value }) => this.setState({ [ name ]: value });
	show = ( user ) => this.setState({
		googleId: user.googleId,
		email: user.email,
		nik: user.nik,
		name: user.name,
		role: user.role,
		open: true
	});
	close = ( ) => this.setState({ open: false });
	handleDropDown = (e, { value }) => this.setState({ role: value });
	render( ) {
		const { users } = this.state;
		const formBtn = (
			<Form>
				<Form.Field>
					<label>email</label>
					<Input value={this.state.email}/>
				</Form.Field>
				<Form.Field>
					<label>nik</label>
					<Input placeholder='Label' name='nik' value={this.state.nik} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>name</label>
					<Input placeholder='Label' name='name' value={this.state.name} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>role</label>
					<Dropdown text={this.state.role === UserRole[0]
						? 'Owner'
						: this.state.role === UserRole[1]
							? 'Kepala Cabang'
							: this.state.role === UserRole[2]
								? 'Karyawan'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item onClick={this.handleDropDown} text='Owner' value={UserRole[0]}/>
							<Dropdown.Item onClick={this.handleDropDown} text='Kepala Cabang' value={UserRole[1]}/>
							<Dropdown.Item onClick={this.handleDropDown} text='Karyawan' value={UserRole[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
			</Form>
		);
		return (
			<div style={{
				marginBottom: '100px'
			}}>
				<Modal size='tiny' open={this.state.open} onClose={this.close}>
					<Modal.Header>{'EDIT : ' + this.state.name}</Modal.Header>
					<Modal.Content>{formBtn}</Modal.Content>
					<Modal.Actions>
						<Popup trigger={(
							<Input type='text' placeholder='type email to confirm' action error={this.state.confirm === this.state.email
								? false
								: true} onChange={this.handleConfirmDeleteChange}>
								<input/>
								<Button negative type='submit' onClick={this.delete} disabled={this.state.confirm === this.state.email
									? false
									: true}>Delete</Button>
							</Input>
						)} content='PERINGATAN : setelah klik tombol delete, data yang telah terhapus tidak akan pernah bisa kembali! ketikan email untuk melanjutkan proses delete..' inverted/>
						<Divider/>
						<Button basic negative onClick={this.close}>Cancel</Button>
						<Button positive onClick={this.handleConfirm}>Save</Button>
					</Modal.Actions>
				</Modal>
				<Header style={{
					margin: '20px'
				}} as='h1'>Akun</Header>
				<Table celled selectable padded unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Email</Table.HeaderCell>
							<Table.HeaderCell>NIK</Table.HeaderCell>
							<Table.HeaderCell>Nama</Table.HeaderCell>
							<Table.HeaderCell>User Type</Table.HeaderCell>
							<Table.HeaderCell textAlign='center'><Icon name='settings'/></Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{users.map(user => (
							<Table.Row error={user.role !== UserRole[0] && user.role !== UserRole[1] && user.role !== UserRole[2]}>
								<Table.Cell>{user.email}</Table.Cell>
								<Table.Cell>{user.nik !== '0'
										? user.nik
										: 'Illegal'}</Table.Cell>
								<Table.Cell>{user.name}</Table.Cell>
								<Table.Cell >{user.role === UserRole[0]
										? 'Owner'
										: user.role === UserRole[1]
											? 'Kepala Cabang'
											: user.role === UserRole[2]
												? 'Karyawan'
												: 'Illegal'}</Table.Cell>
								<Table.Cell collapsing>
									<Button icon onClick={( ) => this.show( user )}>
										<Icon name='edit outline'/>
									</Button>
								</Table.Cell>
							</Table.Row>
						))}</Table.Body>
				</Table>
			</div>
		)
	}
}
export default Operasional;
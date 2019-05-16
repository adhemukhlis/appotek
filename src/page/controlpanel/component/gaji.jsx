import React, { Component } from 'react';
import {
	Form,
	Header,
	Button,
	Table,
	Icon,
	Modal,
	Input,
	Dropdown,
	Popup,
	Divider
} from 'semantic-ui-react';
import { UANG } from "../../component/func_lib";
import { UserRole, Cabang } from "../../config";
import { firebaseRef_GAJI } from "../../../firebase/firebaseRef";
class Operasional extends Component {
	state = {
		gaji: [],
		open: false,
		selected_id: null,
		selected_jabatan: null,
		selected_cabang: null,
		selected_gaji: null
	};
	componentWillMount( ) {
		firebaseRef_GAJI.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					...shot.val( ),
					id: shot.key
				})
			});
			console.log( tmp );
			this.setState({ gaji: tmp })
		})
	}
	update = ( ) => {
		const content = {
			cabang: this.state.selected_cabang,
			gaji: this.state.selected_gaji,
			jabatan: this.state.selected_jabatan
		};
		if ( this.state.selected_id !== null ) {
			firebaseRef_GAJI
				.child( this.state.selected_id )
				.update( content )
				.then(( ) => {
					console.log( "Data saved successfully." )
				})
				.catch(( error ) => {
					console.log( "Data could not be saved." + error )
				})
		} else {
			firebaseRef_GAJI.push( content )
		}
	}
	delete = ( ) => {
		firebaseRef_GAJI
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
	close = ( ) => this.setState({ open: false });
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	show = ( gaji ) => {
		if ( gaji === "new" ) {
			this.setState({ selected_id: null, selected_jabatan: null, selected_cabang: null, selected_gaji: null, open: true })
		} else {
			this.setState({ selected_id: gaji.id, selected_jabatan: gaji.jabatan, selected_cabang: gaji.cabang, selected_gaji: gaji.gaji, open: true })
		}
	};
	render( ) {
		const { gaji } = this.state;
		const formBtn = (
			<Form>
				<Form.Field>
					<label>Jabatan</label>
					<Dropdown text={this.state.selected_jabatan === UserRole[0]
						? 'Owner'
						: this.state.selected_jabatan === UserRole[1]
							? 'Kepala Cabang'
							: this.state.selected_jabatan === UserRole[2]
								? 'Karyawan'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_jabatan' onClick={this.handleDropDown} text='Owner' value={UserRole[0]}/>
							<Dropdown.Item name='selected_jabatan' onClick={this.handleDropDown} text='Kepala Cabang' value={UserRole[1]}/>
							<Dropdown.Item name='selected_jabatan' onClick={this.handleDropDown} text='Karyawan' value={UserRole[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Cabang</label>
					<Dropdown text={this.state.selected_cabang === Cabang[0]
						? 'Jakarta'
						: this.state.selected_cabang === Cabang[1]
							? 'Purwokerto 1'
							: this.state.selected_cabang === Cabang[2]
								? 'Purwokerto 2'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_cabang' onClick={this.handleDropDown} text='Jakarta' value={Cabang[0]}/>
							<Dropdown.Item name='selected_cabang' onClick={this.handleDropDown} text='Purwokerto 1' value={Cabang[1]}/>
							<Dropdown.Item name='selected_cabang' onClick={this.handleDropDown} text='Purwokerto 2' value={Cabang[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Gaji</label>
					<Input placeholder='Label' name='selected_gaji' value={this.state.selected_gaji} onChange={this.handleChange}/>
				</Form.Field>
			</Form>
		);
		return (
			<div style={{
				marginBottom: '100px'
			}}>
				<Modal size='tiny' open={this.state.open} onClose={this.close}>
					<Modal.Header>{this.state.selected_jabatan}</Modal.Header>
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
				}} as='h1'>Gaji</Header>
				<Table celled selectable padded unstackable>
					<Table.Header>
						<Table.Row >
							<Table.HeaderCell colSpan='4'>
								<Button floated="right" onClick={( ) => this.show( 'new' )} positive>add</Button>
							</Table.HeaderCell>
						</Table.Row>
						<Table.Row>
							<Table.HeaderCell>Jabatan</Table.HeaderCell>
							<Table.HeaderCell>Cabang</Table.HeaderCell>
							<Table.HeaderCell>Gaji</Table.HeaderCell>
							<Table.HeaderCell textAlign='center'><Icon name='settings'/></Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{gaji.map(gaji => (
							<Table.Row>
								<Table.Cell>{gaji.jabatan}</Table.Cell>
								<Table.Cell>{gaji.cabang}</Table.Cell>
								<Table.Cell>{UANG( gaji.gaji )}</Table.Cell>
								<Table.Cell collapsing>
									<Button icon onClick={( ) => this.show( gaji )}>
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
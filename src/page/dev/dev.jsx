import React, { Component } from 'react';
import { Form, Grid, Input, Button } from 'semantic-ui-react';
import { firebaseRef_USER } from "../../firebase/firebaseRef";
class FormExampleSubcomponentControl extends Component {
	state = {
		loaded: null,
		id: null,
		email: '',
		nama: '',
		jabatan: '',
		nik: ''
	};
	checkUser = ( email ) => {
		firebaseRef_USER
			.orderByChild( 'email' )
			.equalTo( email )
			.once('value', snap => {
				snap.forEach(shot => {
					const data = shot.val( );
					console.log( shot.key );
					this.setState({
						id: shot.key,
						email: data.email,
						nama: data.name,
						nik: data.nik,
						jabatan: data.role,
						loaded: true
					})
				})
			})
	}
	update = ( ) => {
		const content = {
			email: this.state.email,
			nik: this.state.nik,
			name: this.state.nama,
			role: this.state.jabatan
		};
		firebaseRef_USER
			.child( this.state.id )
			.update( content )
			.then(( ) => {
				console.log( "Data saved successfully." )
			})
			.catch(( error ) => {
				console.log( "Data could not be saved." + error )
			})
	}
	handleChange = (e, { value }) => this.setState({ jabatan: value });
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	render( ) {
		const { email, nama, loaded, nik, jabatan } = this.state;
		return (
			<Grid centered columns={2}>
				<Grid.Column>
					<Form>
						<Form.Field>
							<label>email</label>
							<Input fluid type='text' name='email' value={this.state.email} onChange={this.handleInputChange} placeholder='email' action>
								<input/>
								<Button onClick={( ) => this.checkUser( email )} type='submit'>Check</Button>
							</Input>
						</Form.Field>{loaded
							? (
								<div><Form.Input fluid name='nama' onChange={this.handleInputChange} label='nama' value={nama} placeholder='nama'/>
									<Form.Input fluid name='nik' onChange={this.handleInputChange} label='nik' value={nik} placeholder='nik'/>
									<Form.Group inline>
										<label>Jabatan</label>
										<Form.Radio label='Owner' value='ow' checked={jabatan === 'ow'} onChange={this.handleChange}/>
										<Form.Radio label='K.Cabang' value='kc' checked={jabatan === 'kc'} onChange={this.handleChange}/>
										<Form.Radio label='Karyawan' value='kw' checked={jabatan === 'kw'} onChange={this.handleChange}/>
									</Form.Group>
									<Form.Button onClick={( ) => this.update( )}>Set</Form.Button>
								</div>
							)
							: null}</Form>
				</Grid.Column>
			</Grid>
		)
	}
}
export default FormExampleSubcomponentControl;
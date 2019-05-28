import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { UserRole } from '../../config';
class AkunEdit extends Component {
	render( ) {
		const {
			_data,
			_keydelete,
			_close,
			_open,
			_headername,
			_placeholder,
			_onSave,
			_delete,
			handleInputChange,
			handleDropDownChange
		} = this.props;
		const FormContent = (
			<Form>
				<Form.Field>
					<label>Email</label>
					<Input value={_data.email}/>
				</Form.Field>
				<Form.Field>
					<label>NIK</label>
					<Input placeholder='NIK' name='nik' value={_data.nik} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>Name</label>
					<Input placeholder='Name' name='name' value={_data.name} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>role</label>
					<Dropdown text={_data.role === UserRole[0]
						? 'Owner'
						: _data.role === UserRole[1]
							? 'Kepala Cabang'
							: _data.role === UserRole[2]
								? 'Karyawan'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='role' onClick={handleDropDownChange} text='Owner' value={UserRole[0]}/>
							<Dropdown.Item name='role' onClick={handleDropDownChange} text='Kepala Cabang' value={UserRole[1]}/>
							<Dropdown.Item name='role' onClick={handleDropDownChange} text='Karyawan' value={UserRole[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent}/> )
	}
}
export default AkunEdit;
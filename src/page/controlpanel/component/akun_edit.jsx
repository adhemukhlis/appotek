import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input, Dropdown } from 'semantic-ui-react';
import DropdownCabang from "./dropdown_cabang";
import { LIST_CABANG } from "../../../firebase/firebaseREST";
import { UserRole } from '../../config';
import { VALIDATION_CP_AKUN } from '../../component/func_lib';
class AkunEdit extends Component {
	state = {
		cabang: LIST_CABANG( )
	};
	render( ) {
		const { cabang } = this.state;
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
					<label>ID</label>
					<Input value={_data.googleId}/>
				</Form.Field>
				<Form.Field>
					<label>Email</label>
					<Input value={_data.email}/>
				</Form.Field>
				<Form.Field>
					<label>NIK</label>
					<Input type='number' placeholder='NIK' name='selected_nik' value={_data.nik} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>Name</label>
					<Input placeholder='Name' name='selected_name' value={_data.name} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>Role</label>
					<Dropdown text={_data.role === UserRole[0]
						? 'Owner'
						: _data.role === UserRole[1]
							? 'Kepala Cabang'
							: _data.role === UserRole[2]
								? 'Karyawan'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_role' onClick={handleDropDownChange} text='Owner' value={UserRole[0]}/>
							<Dropdown.Item name='selected_role' onClick={handleDropDownChange} text='Kepala Cabang' value={UserRole[1]}/>
							<Dropdown.Item name='selected_role' onClick={handleDropDownChange} text='Karyawan' value={UserRole[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Cabang</label>
					<DropdownCabang _data={_data} _cabang={cabang} handleDropDownChange={handleDropDownChange}/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent} _validation={VALIDATION_CP_AKUN(_data)}/> )
	}
}
export default AkunEdit;
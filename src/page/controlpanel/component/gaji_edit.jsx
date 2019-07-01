import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import DropdownCabang from "./dropdown_cabang";
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { UserRole } from '../../config';
import { UANG, VALIDATION_CP_GAJI } from '../../component/func_lib';
import { LIST_CABANG } from '../../../firebase/firebaseREST';
class GajiEdit extends Component {
	state = {
		cabang:LIST_CABANG()
	}
	render( ) {
		const {cabang} = this.state
		const {
			_data,
			_keydelete,
			_close,
			_open,
			_headername,
			_placeholder,
			_onSave,
			_delete,
			_new_data,
			handleInputChange,
			handleDropDownChange
		} = this.props;
		const FormContent = (
			<Form>{_new_data
					? null
					: (
						<Form.Field>
							<label>ID</label>
							<Input readOnly value={_data.id}/>
						</Form.Field>
					)}
				<Form.Field>
					<label>Jabatan</label>
					<Dropdown text={_data.jabatan === UserRole[0]
						? 'Owner'
						: _data.jabatan === UserRole[1]
							? 'Kepala Cabang'
							: _data.jabatan === UserRole[2]
								? 'Karyawan'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_jabatan' onClick={handleDropDownChange} text='Owner' value={UserRole[0]}/>
							<Dropdown.Item name='selected_jabatan' onClick={handleDropDownChange} text='Kepala Cabang' value={UserRole[1]}/>
							<Dropdown.Item name='selected_jabatan' onClick={handleDropDownChange} text='Karyawan' value={UserRole[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Cabang</label>
					<DropdownCabang _data={_data} _cabang={cabang} handleDropDownChange={handleDropDownChange}/>
				</Form.Field>
				<Form.Field>
					<label>Gaji</label>
					<Input type='number'  placeholder='Gaji' name='selected_gaji' value={_data.gaji} onChange={handleInputChange} label={{
						tag: true,
						content: UANG( _data.gaji )
					}} labelPosition='right'/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _hidedelete={_new_data} _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent} _validation={VALIDATION_CP_GAJI(_data)}/> )
	}
}
export default GajiEdit;
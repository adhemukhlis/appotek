import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { UserRole,Cabang } from '../../config';
class GajiEdit extends Component {
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
					<label>ID</label>
					<Input readOnly value={_data.id} />
				</Form.Field>
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
					<Dropdown text={_data.cabang === Cabang[0]
						? 'Jakarta'
						: _data.cabang === Cabang[1]
							? 'Purwokerto 1'
							: _data.cabang === Cabang[2]
								? 'Purwokerto 2'
								: 'Illegal'} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_cabang' onClick={handleDropDownChange} text='Jakarta' value={Cabang[0]}/>
							<Dropdown.Item name='selected_cabang' onClick={handleDropDownChange} text='Purwokerto 1' value={Cabang[1]}/>
							<Dropdown.Item name='selected_cabang' onClick={handleDropDownChange} text='Purwokerto 2' value={Cabang[2]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Gaji</label>
					<Input placeholder='Gaji' name='selected_gaji' value={_data.gaji} onChange={handleInputChange}/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent}/> )
	}
}
export default GajiEdit;
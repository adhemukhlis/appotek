import React, { Component } from 'react';
import EditPopup from "../../../editpopup/editpopup";
import { Form, Input } from 'semantic-ui-react';
import { UANG, VALIDATION_BRG_CABANG } from "../../../component/func_lib";
import DataID from "../dropdown_id";
class DataBarangEdit extends Component {
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
			_new_data,
			handleInputChange,
			handleDropDown
		} = this.props;
		const FormContent = (
			<Form>{_new_data
					? (
						<Form.Field>
							<label>Pilih barang</label>
							<DataID handleDropDown={handleDropDown}/>
						</Form.Field>
					)
					: (
						<Form.Field>
							<label>kode</label>
							<Input readOnly value={_data.id}/>
						</Form.Field>
					)}
				<Form.Field>
					<label>Stok</label>
					<Input type='number'placeholder='Stok' name='selected_stok' value={_data.stok} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>Harga</label>
					<Input type='number' placeholder='Harga' name='selected_harga' value={_data.harga} onChange={handleInputChange} label={{
						tag: true,
						content: UANG( _data.harga )
					}} labelPosition='right'/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _hidedelete={_new_data} _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent} _validation={VALIDATION_BRG_CABANG(_data)}/> )
	}
}
export default DataBarangEdit;
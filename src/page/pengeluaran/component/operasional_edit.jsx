import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input } from 'semantic-ui-react';
import { UANG } from "../../component/func_lib";
class OperasionalEdit extends Component {
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
			handleInputChange
		} = this.props;
		const FormContent = (
			<Form>{_new_data
					? null
					: (
						<Form.Field >
							<label>kode</label>
							<Input name='selected_id' onChange={handleInputChange} placeholder='Kode pembelian' value={_data.id}/>
						</Form.Field>
					)}
				<Form.Field>
					<label>Pembelian</label>
					<Input name='selected_pembelian' onChange={handleInputChange} placeholder='Pembelian' value={_data.pembelian}/>
				</Form.Field>
				<Form.Field>
					<label>QTY</label>
					<Input name='selected_qty' onChange={handleInputChange} value={_data.qty} placeholder='Banyak Barang'/>
				</Form.Field>
				<Form.Field>
					<label>Harga</label>
					<Input value={_data.harga} name='selected_harga' onChange={handleInputChange} placeholder='Harga beli' label={{
						tag: true,
						content: UANG( _data.harga )
					}} labelPosition='right'/>
				</Form.Field>
				<Form.Field>
					<label>Total</label>
					<Input value={_data.qty * _data.harga} readOnly label={{
						tag: true,
						content: UANG( _data.qty * _data.harga )
					}} labelPosition='right'/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _hidedelete={_new_data} _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent}/> )
	}
}
export default OperasionalEdit;
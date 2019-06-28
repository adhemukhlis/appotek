import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { UANG } from "../../component/func_lib";
import { PengeluaranTypes } from '../../config';
class PengeluaranEdit extends Component {
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
			_validation_kc,
			handleInputChange,
			handleDropDownChange
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
					<label>Jenis Pembelian</label>
					<Dropdown text={_data.jenis_pembelian === PengeluaranTypes[0]
						? 'Operasional'
						: _data.jenis_pembelian === PengeluaranTypes[1]
							? 'Barang'
							: null} selection>
						<Dropdown.Menu >
							<Dropdown.Item name='selected_jenis_pembelian' onClick={handleDropDownChange} text='Operasional' value={PengeluaranTypes[0]}/>
							<Dropdown.Item name='selected_jenis_pembelian' onClick={handleDropDownChange} text='Barang' value={PengeluaranTypes[1]}/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Field>
				<Form.Field>
					<label>Cabang</label>
					<Input name='selected_cabang' onChange={handleInputChange} placeholder='Cabang' value={_validation_kc==='all'?_data.cabang:_validation_kc} readOnly={_validation_kc==='jkt'||_validation_kc==='jkt'}/>
				</Form.Field>
				<Form.Field>
					<label>QTY</label>
					<Input name='selected_qty' onChange={handleInputChange} value={_data.qty} placeholder='Banyak Barang'/>
				</Form.Field>
				<Form.Field>
					<label>Satuan</label>
					<Input name='selected_satuan' onChange={handleInputChange} placeholder='Satuan' value={_data.satuan}/>
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
export default PengeluaranEdit;
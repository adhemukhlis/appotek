import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { Form, Input } from 'semantic-ui-react';
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
			handleInputChange
		} = this.props;
		const FormContent = (
                        <Form>
                        <Form.Field>
                                <label>kode</label>
                                <Input readOnly value={_data.id}/>
                        </Form.Field>
                        <Form.Field>
                                <label>Nama Barang</label>
                                <Input placeholder='Nama Barang' name='selected_nama_barang' value={_data.nama_barang} onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                                <label>Desc</label>
                                <Input placeholder='Desc' name='selected_desc' value={_data.desc} onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                                <label>Filename</label>
                                <Input placeholder='Filename' name='selected_img' value={_data.img} onChange={handleInputChange}/>
                        </Form.Field>
                </Form>
		);
		return ( <EditPopup _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent}/> )
	}
}
export default DataBarangEdit;
import React, { Component } from 'react';
import EditPopup from "../../editpopup/editpopup";
import { rootRefStore } from "../../../firebase/firebaseRef";
import FileUploader from "react-firebase-file-uploader";
import { Form, Input, Image } from 'semantic-ui-react';
import { VALIDATION_BRG } from '../../component/func_lib';
class DataBarangEdit extends Component {
	state = {
		isUploading: false,
		progress: 0,
		tmpUrl: ""
	};
	handleUploadStart = ( ) => this.setState({ isUploading: true, progress: 0 });
	handleUploadError = error => {
		this.setState({ isUploading: false });
		console.error( error )
	};
	handleUploadSuccess = filename => {
		console.log( filename );
		this
			.props
			.handleUploadImage( filename );
		this.setState({ avatar: filename, progress: 100, isUploading: false });
		rootRefStore
			.child( filename )
			.getDownloadURL( )
			.then(url => this.setState({ tmpUrl: url }))
	};
	handleProgress = progress => this.setState({ progress });
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
			_exist_data,
			handleInputChange
		} = this.props;
		const FormContent = (
			<Form>
				<Form.Field>
					<label>Gambar</label>{this.state.isUploading && (
						<p>Progress:{this.state.progress}</p>
					)}{this.state.tmpUrl && ( <Image src={this.state.tmpUrl} centered/> )}{!_new_data && _data.url && ( <Image src={_data.url} centered/> )}
					<Input placeholder='Filename' name='selected_img' value={_data.img} readOnly/>
					<FileUploader accept="image/*" name="avatar" maxHeight={228} maxWidth={266} randomizeFilename storageRef={rootRefStore} onUploadStart={this.handleUploadStart} onUploadError={this.handleUploadError} onUploadSuccess={this.handleUploadSuccess} onProgress={this.handleProgress}/>
				</Form.Field>
				<Form.Field error={_exist_data && _new_data}>
					<label>kode</label>
					<Input type='number' name='new_id' onChange={handleInputChange} readOnly={!_new_data} value={_data.id}/>
				</Form.Field>
				<Form.Field>
					<label>Nama Barang</label>
					<Input placeholder='Nama Barang' name='selected_nama_barang' value={_data.nama_barang} onChange={handleInputChange}/>
				</Form.Field>
				<Form.Field>
					<label>Desc</label>
					<Input placeholder='Desc' name='selected_desc' value={_data.desc} onChange={handleInputChange}/>
				</Form.Field>
			</Form>
		);
		return ( <EditPopup _validation={VALIDATION_BRG(_exist_data,_new_data,_data)} _hidedelete={_new_data} _delete={_delete} _onSave={_onSave} _placeholder={_placeholder} _close={_close} _keydelete={_keydelete} _headername={_headername} _open={_open} _formcontent={FormContent}/> )
	}
}
export default DataBarangEdit;
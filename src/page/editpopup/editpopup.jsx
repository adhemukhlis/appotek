import React, { Component } from 'react';
import {
	Modal,
	Input,
	Button,
	Divider,
	Popup,
	Icon
} from 'semantic-ui-react';
class EditPopup extends Component {
	state = {
		confirm: null
	};
	handleConfirmDeleteChange = (e, { value }) => {
		this.setState({ confirm: value })
	};
	render( ) {
		const {
			_delete,
			_onSave,
			_keydelete,
			_headername,
			_formcontent,
			_open,
			_close,
			_placeholder,
			_hidedelete,
			_validation
		} = this.props;
		return (
			<Modal size='tiny' open={_open} onClose={_close}>
				<Modal.Header>{_headername}</Modal.Header>
				<Modal.Content>{_formcontent}</Modal.Content>
				<Modal.Actions>{_hidedelete
						? null
						: <Popup trigger={(
							<Input type='text' placeholder={_placeholder} action error={this.state.confirm == _keydelete
								? false
								: true} onChange={this.handleConfirmDeleteChange}>
								<input/>
								<Button negative type='submit' onClick={_delete} disabled={this.state.confirm == _keydelete
									? false
									: true} animated='vertical'>
									<Button.Content hidden>Delete</Button.Content>
									<Button.Content visible>
										<Icon name='trash'/>
									</Button.Content>
								</Button>
							</Input>
						)} content={'PERINGATAN : setelah klik tombol delete, data yang telah terhapus tidak akan pernah bisa kembali! ketikan ' + _placeholder + ' untuk melanjutkan proses delete..'} inverted/>}
					<Divider/>
					<Button basic negative onClick={_close}>Cancel</Button>
					<Button positive onClick={_onSave} disabled={_validation}>Save</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
export default EditPopup;
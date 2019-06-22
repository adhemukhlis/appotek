import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import { Redirect } from "react-router-dom";
import { firebaseRef_SEARCH } from '../../firebase/firebaseRef';
class Test extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			delay: 100,
			result: '-'
		};
		this.handleScan = this
			.handleScan
			.bind( this )
	}
	handleScan( data ) {
		
		if ( data !== null && data!==this.state.result) {
			console.log( data );
			this.setState({ result: data });
			firebaseRef_SEARCH
				.child( this.props.userdata.nik )
				.update({ search: data })
		}
	}
	handleError( err ) {
		console.error( err )
	}
	showData = ( ) => {}
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const previewStyle = {
			height: '100vw',
			width: '100%'
		};
		return (
			<div style={{ height:'50vh'}}>
				<QrReader delay={this.state.delay} style={previewStyle} onError={this.handleError} onScan={this.handleScan}/>
				<span style={{fontSize:'50px'}}>{"ID: "+this.state.result}</span>
			</div>
		)
	}
}
export default Test;
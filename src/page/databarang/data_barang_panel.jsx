import React, { Component } from 'react';
import { firebaseRef_CABANG_BARANG, firebaseRef_BARANG } from "../../firebase/firebaseRef";
import DataBarang from "./component/data_barang";
import DataBarangCabang from "./component/data_barang_cabang/data_barang_cabang";
import { Tab, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { CabangFull, Cabang } from '../config';
import { PanelHeader } from '../style';
class PanelBarang extends Component {
	state = {
		jkt: [],
		pwt: [ ]
	};
	Load = ( ) => {
		Cabang.map(cbg => {
			firebaseRef_CABANG_BARANG( cbg ).on('value', snap => {
				let tmp_barang = [ ];
				snap.forEach(shotdata => {
					firebaseRef_BARANG
						.child( shotdata.key )
						.on('value', data => {
							tmp_barang.push({
								...shotdata.val( ),
								...data.val( )
							})
						})
				});
				this.setState({ [ cbg ]: tmp_barang })
			})
		})
	}
	componentDidMount( ) {
		this.Load( );
		firebaseRef_BARANG.on('child_changed', data => {
			this.Load( )
		})
	}
	render( ) {
		const { legalAccess } = this.props;
		const panes = [
			{
				menuItem: 'Data Barang',
				render: ( ) => (
					<Tab.Pane><DataBarang/></Tab.Pane>
				)
			}, {
				menuItem: CabangFull[0],
				render: ( ) => (
					<Tab.Pane><DataBarangCabang nama_cabang={CabangFull[0]} data_barang={this.state.jkt} id_cabang={Cabang[0]}/></Tab.Pane>
				)
			}, {
				menuItem: CabangFull[1],
				render: ( ) => (
					<Tab.Pane><DataBarangCabang nama_cabang={CabangFull[1]} data_barang={this.state.pwt} id_cabang={Cabang[1]}/></Tab.Pane>
				)
			}
		];
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		return (
			<div>
				<div style={PanelHeader}>
					<Header as='h1'>
						DATA BARANG
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default PanelBarang;
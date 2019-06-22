import React, { Component } from 'react';
import DataTransaksiCabang from "./component/data_transaksi_cabang";
import { Tab, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { CabangFull, Cabang } from '../config';
import { PanelHeader } from '../style';
import { firebaseRef_getTRANSAKSI_CABANG } from '../../firebase/firebaseRef';
class PanelTransaksiData extends Component {
	state = {
		jkt: [],
		pwt: [ ]
	};
	componentWillMount( ) {
		Cabang.map(cbg => {
			firebaseRef_getTRANSAKSI_CABANG( cbg ).on('value', snap => {
				let tmp_transaksi = [ ];
				snap.forEach(shotdata => {
					tmp_transaksi.push({
						...shotdata.val( )
					})
				});
				this.setState({ [ cbg ]: tmp_transaksi })
			})
		})
	}
	render( ) {
		const { legalAccess } = this.props;
		const panes = [
			{
				menuItem: CabangFull[0],
				render: ( ) => (
					<Tab.Pane><DataTransaksiCabang nama_cabang={CabangFull[0]} data_barang={this.state.jkt} id_cabang={Cabang[0]}/></Tab.Pane>
				)
			}, {
				menuItem: CabangFull[1],
				render: ( ) => (
					<Tab.Pane><DataTransaksiCabang nama_cabang={CabangFull[1]} data_barang={this.state.pwt} id_cabang={Cabang[1]}/></Tab.Pane>
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
						DATA TRANSAKSI
					</Header>
				</div>
				<Tab panes={panes}/>
			</div>
		)
	}
}
export default PanelTransaksiData;
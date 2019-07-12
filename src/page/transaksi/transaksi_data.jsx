import React, { Component } from 'react';
import DataTransaksiCabang from "./component/data_transaksi_cabang";
import { Tab, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { CabangFull, Cabang } from '../config';
import { PanelHeader } from '../style';
import { firebaseRef_getTRANSAKSI_CABANG } from '../../firebase/firebaseRef';
import { DateToISO } from "../component/func_lib";
class PanelTransaksiData extends Component {
	state = {
		jkt: [],
		pwt: [],
		tahun: "",
		bulan: 0
	};
	LoadAll = ( ) => {
		Cabang.map(cbg => {
			firebaseRef_getTRANSAKSI_CABANG( cbg, false, false ).on('value', snap => {
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
	LoadFilter = ( cbg ) => {
		console.log( "here" );
		if ( this.state.tahun !== "" ) {
			firebaseRef_getTRANSAKSI_CABANG(cbg, DateToISO( parseInt( this.state.tahun ), this.state.bulan === 0
				? 1
				: this.state.bulan, 1 ), DateToISO( this.state.bulan === 0
				? parseInt( this.state.tahun ) + 1
				: parseInt( this.state.tahun ), this.state.bulan === 0
				? 1
				: this.state.bulan + 1, 1 )).on('value', snap => {
				let tmp_transaksi = [ ];
				snap.forEach(shotdata => {
					tmp_transaksi.push({
						...shotdata.val( )
					})
				});
				this.setState({ [ cbg ]: tmp_transaksi })
			})
		} else {
			this.LoadAll( )
		}
	}
	componentWillMount( ) {
		this.LoadAll( )
	}
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	render( ) {
		const { legalAccess } = this.props;
		const { tahun } = this.state;
		const panes = [
			{
				menuItem: CabangFull[0],
				render: ( ) => (
					<Tab.Pane><DataTransaksiCabang nama_cabang={CabangFull[0]} data_barang={this.state.jkt} id_cabang={Cabang[0]} handleDropDown={this.handleDropDown} _tahun={tahun} _applyfilter={( ) => this.LoadFilter(Cabang[0])} handleInputChange={this.handleInputChange}/></Tab.Pane>
				)
			}, {
				menuItem: CabangFull[1],
				render: ( ) => (
					<Tab.Pane><DataTransaksiCabang nama_cabang={CabangFull[1]} data_barang={this.state.pwt} id_cabang={Cabang[1]} handleDropDown={this.handleDropDown} _tahun={tahun} _applyfilter={( ) => this.LoadFilter(Cabang[1])} handleInputChange={this.handleInputChange}/></Tab.Pane>
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
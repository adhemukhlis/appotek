import React, { Component } from 'react';
import { data_bln, option } from "./component/config";
import { Line } from 'react-chartjs-2';
class PemasukanBLN extends Component {
	render( ) {
		return ( <Line options={option('Date')} data={data_bln}/> )
	}
}
export default PemasukanBLN;
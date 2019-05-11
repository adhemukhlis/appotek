import React from 'react';
import { Ic_r_bars, Ic_r_times } from "./react-icon-svg";
const SvgComponent = props => (
	<div style={{
		position: 'relative',
		display: 'inline-block',
		width: props.sizeIcon + 'vh',
		height: props.sizeIcon + 'vh',
		backgroundColor: '#1b1c1d',
		margin:'1vh'
	}}>
		<div style={{
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100%',
			width: '100%'
		}}>{props.active
				? <Ic_r_times height={(props.sizeIcon - ( props.sizeIcon / 2 )) + 'vh'} fill="#fff"/>
				: <Ic_r_bars height={(props.sizeIcon - ( props.sizeIcon / 2 )) + 'vh'} fill="#fff"/>}</div>
	</div>
);
export default SvgComponent;
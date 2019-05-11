import React, { Component } from 'react';
import { Sidebar, Menu, Segment, Grid, Label } from 'semantic-ui-react';
import FloatButton from "./float_menu";
import {
	Ic_s_arrow_alt_from_left,
	Ic_s_pallet,
	Ic_s_chart_line,
	Ic_s_id_card,
	Ic_s_user_crown,
	Ic_s_user_cog,
	Ic_s_user,
	Ic_s_users_cog
} from './react-icon-svg';
import { white, SideBarIconSize } from "../style";
import { UserRole } from '../config';
class SideBar extends Component {
	state = {
		activeItem: 'pemasukan',
		visible: false
	};
	handleHideClick = ( ) => this.setState({ visible: false });
	handleShowClick = ( ) => this.setState({
		visible: !this.state.visible
	});
	handleSidebarHide = ( ) => this.setState({ visible: false });
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	render( ) {
		const {user} = this.props
		const { visible } = this.state;
		return (
			<div>
				<Sidebar.Pushable as={Segment}>
					<Sidebar as={Menu} animation='uncover' icon='labeled' inverted vertical visible={visible} width='thin'>
						<Menu.Item href='/#/'>{user === UserRole[0]
								? <Ic_s_user_crown height={SideBarIconSize} fill={white}/>
								: user === UserRole[1]
									? <Ic_s_user_cog height={SideBarIconSize} fill={white}/>
									: <Ic_s_user height={SideBarIconSize} fill={white}/>}
							<div style={{
								marginTop: '10px'
							}}>
								<Label color='blue'>{user}</Label>
							</div>
						</Menu.Item>
						<Menu.Item href='/#/pemasukan'>
							<Ic_s_chart_line height={SideBarIconSize} fill={white}/>
							<p>Pemasukan</p>
						</Menu.Item>
						<Menu.Item href='/#/pengeluaran'>
							<Ic_s_arrow_alt_from_left height={SideBarIconSize} fill={white}/>
							<p>Pengeluaran</p>
						</Menu.Item>
						<Menu.Item href='/#/barang'>
							<Ic_s_pallet height={SideBarIconSize} fill={white}/>
							<p>Barang</p>
						</Menu.Item>
						<Menu.Item href='/#/presensi'>
							<Ic_s_id_card height={SideBarIconSize} fill={white}/>
							<p>Karyawan</p>
						</Menu.Item>
						{user===UserRole[0]?(<Menu.Item href='/#/control'>
							<Ic_s_users_cog height={SideBarIconSize} fill={white}/>
							<p>Control</p>
						</Menu.Item>):null}
						
					</Sidebar>
					<Sidebar.Pusher dimmed={false}>
						<div style={{
							minHeight: '100vh',
							paddingBottom: '10vh'
						}}>
							<div onClick={this.handleShowClick}>
								<FloatButton active={this.state.visible} sizeIcon={8}/>
							</div>
							<Grid centered>
								<Grid.Column width={12}>{this.props.children}</Grid.Column>
							</Grid>
						</div>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		)
	}
}
export default SideBar;
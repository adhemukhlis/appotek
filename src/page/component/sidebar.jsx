import React, { Component } from 'react';
import {
	Sidebar,
	Menu,
	Segment,
	Grid,
	Label,
	Popup,
	Button
} from 'semantic-ui-react';
import FloatButton from "./float_menu";
import {
	Ic_s_arrow_alt_from_left,
	Ic_s_pallet,
	Ic_s_chart_line,
	Ic_s_id_card,
	Ic_s_user_crown,
	Ic_s_user_cog,
	Ic_s_users_cog,
	Ic_s_user,
	Ic_s_cash_register
} from './react-icon-svg';
import {
	white,
	SideBarIconSize,
	StatusBarIconSize,
	ContentMenu,
	SidebarFloatBTN,
	StatusPanel
} from "../style";
import { UserRole, Path } from '../config';
class SideBar extends Component {
	state = {
		visible: false
	};
	handleHideClick = ( ) => this.setState({ visible: false });
	logout = ( ) => {
		this
			.props
			.logout( );
		this.handleHideClick( )
	}
	handleShowClick = ( ) => this.setState({
		visible: !this.state.visible
	});
	render( ) {
		const { user } = this.props;
		const { visible } = this.state;
		return (
			<div>
				<Sidebar.Pushable as={Segment}>
					<Sidebar as={Menu} animation='uncover' icon='labeled' inverted vertical visible={visible} width='thin'>
						<Menu.Item href={'/#' + Path.PagePemasukan}>
							<Ic_s_chart_line height={SideBarIconSize} fill={white}/>
							<p>Pemasukan</p>
						</Menu.Item>
						<Menu.Item href={'/#' + Path.PageTransaksiData}>
							<Ic_s_cash_register height={SideBarIconSize} fill={white}/>
							<p>Transaksi</p>
						</Menu.Item>
						<Menu.Item href={'/#' + Path.PagePengeluaran}>
							<Ic_s_arrow_alt_from_left height={SideBarIconSize} fill={white}/>
							<p>Pengeluaran</p>
						</Menu.Item>
						<Menu.Item href={'/#' + Path.PageDataBarang}>
							<Ic_s_pallet height={SideBarIconSize} fill={white}/>
							<p>Barang</p>
						</Menu.Item>
						{/* <Menu.Item href={'/#' + Path.PagePresensi}>
							<Ic_s_id_card height={SideBarIconSize} fill={white}/>
							<p>Karyawan</p>
						</Menu.Item> */}
						{user.role === UserRole[0]
							? (
								<Menu.Item href={'/#' + Path.PageControlPanel}>
									<Ic_s_users_cog height={SideBarIconSize} fill={white}/>
									<p>Control</p>
								</Menu.Item>
							)
							: null}</Sidebar>
					<Sidebar.Pusher dimmed={false}>
						<div style={user.role !== null
							? ContentMenu
							: null}>{user.role !== null
								? (
									<div>{user.role !== UserRole[2]
											? (
												<div style={SidebarFloatBTN} onClick={this.handleShowClick}>
													<FloatButton active={this.state.visible} sizeIcon={8}/>
												</div>
											)
											: null}
										<div style={StatusPanel}>
											<Popup trigger={(
												<Label as='a' size='big' color={user.role === UserRole[0]
													? 'blue'
													: user.role === UserRole[1]
														? 'red'
														: user.role === UserRole[2]
															? 'yellow'
															: null} image>
													<img src={user.imageUrl}/>{user.name}
													<Label.Detail>{user.role === UserRole[0]
															? <Ic_s_user_crown height={StatusBarIconSize} fill={white}/>
															: user.role === UserRole[1]
																? <Ic_s_user_cog height={StatusBarIconSize} fill={white}/>
																: <Ic_s_user height={StatusBarIconSize} fill={white}/>}</Label.Detail>
												</Label>
											)} content={( < Button onClick = {
												( ) => this.logout( )
											}
											color = 'green' content = 'Logout' /> )} on='click' position='bottom center'/>
										</div>
									</div>
								)
								: null}
							<Grid centered>
								<Grid.Column width={user.role !== null
									? 12
									: null}>{this.props.children}</Grid.Column>
							</Grid>
						</div>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		)
	}
}
export default SideBar;
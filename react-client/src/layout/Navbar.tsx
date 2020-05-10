import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
	CssBaseline,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	Hidden,
	List,
	Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListItemLink from '../components/ListItemLink';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import Accounts from '../features/account/Accounts';
import Journals from '../features/journal/Journals';
import Ledgers from '../features/ledger/Ledgers';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`
			}
		},
		drawerPaper: {
			width: drawerWidth
		},
		toolbar: theme.mixins.toolbar,
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none'
			}
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		}

	})
)

const Navbar = () => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const menu = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<ListItemLink to='/' primary='Dashboard' icon={<DashboardIcon />} />
				<ListItemLink to='/accounts' primary='Accounts' icon={<DashboardIcon />} />
				<ListItemLink to='/journals' primary='Journals' icon={<DashboardIcon />} />
				<Divider />
				<ListItemLink to='/ledgers' primary='Ledgers' icon={<DashboardIcon />} />
			</List>
		</div>
	)

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h5' noWrap>
						React Ledger
				</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Hidden smUp implementation='css'>
					<Drawer
						variant='temporary'
						anchor='left'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{ paper: classes.drawerPaper }}
						ModalProps={{ keepMounted: true }}
					>
						<div
							onClick={handleDrawerToggle}
							onKeyDown={handleDrawerToggle}
						>
							{menu}
						</div>
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{ paper: classes.drawerPaper }}
						variant='permanent'
						open
					>
						{menu}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route path='/' exact={true} >
						<Dashboard />
					</Route>
					<Route path='/accounts'>
						<Accounts />
					</Route>
					<Route path='/journals'>
						<Journals />
					</Route>
					<Route path='/ledgers'>
						<Ledgers />
					</Route>
				</Switch>
			</main>
		</div>
	)
}

export default Navbar

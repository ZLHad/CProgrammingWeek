// 响应式左侧迷你变体抽屉组件

import React from 'react';
import clsx from 'clsx';
// material组件库的引入
// Theming主题ThemeProvider引入
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// 响应式左侧迷你变体抽屉
// https://material-ui.com/zh/components/drawers/#responsive-drawer
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// 图标引入 
import MenuIcon from '@material-ui/icons/Menu';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
import ForumIcon from '@material-ui/icons/Forum';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
// 其他组件
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import SettingPage from './SettingPage';
import AnlayzePage from './AnlayzePage';
import Community from './Community';

const { ipcRenderer } = window.require("electron")

const drawerWidth = 200;
const theme = createMuiTheme({
    // 主题配置变量
    // 调色板 palette
    palette: {
        primary: {
            // 黄
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: '#fff',
        },
        secondary: {
            // 蓝
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#000',
        },
    },
});

// 响应式变体抽屉
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        paddingLeft: 12,
        paddingRight: 12,
        marginRight: 24,
    },
    menuBar: {
        minHeight: 36,
        paddingLeft: 13,
        paddingRight: 12,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0),
        minHeight: 44,
    },
    closeButton: {
        outlineColor: "red",
    },
    leftbutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 0),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    title: {
        flexGrow: 1,
    },
}));

// 封装导出组件MiniDrawer
export default function MiniDrawer() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [chose, setChose] = React.useState(0);

    // 抽屉相关
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // 标题栏相关按钮 
    const minAppWindow = () => {
        ipcRenderer.send('minScreen');
    };
    const maxAppWindow = () => {
        ipcRenderer.send('maxScreen');
    };
    const closeAppWindow = () => {
        ipcRenderer.send('closeScreen');
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                {/* 顶部固定App应用栏 */}
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar variant="dense" className={classes.menuBar}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            // edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon fontSize="small" />
                        </IconButton>

                        {/* drawer 标题栏*/}
                        <Typography className={classes.title} align="left" noWrap>
                            C-AccountBook
                        </Typography>
                        {/* 窗口右上最小化、最大化、关闭图标*/}
                        <IconButton aria-label="min the window" edge="end" color="inherit" onClick={minAppWindow}>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="max the window" edge="end" color="inherit" onClick={maxAppWindow}>
                            <CropLandscapeIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="close the window" edge="end" color="inherit" className={classes.closeButton} onClick={closeAppWindow}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* 抽屉内容 */}
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.leftbutton}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key='账单' onClick={() => { setChose(0); }}>
                            <ListItemIcon >
                                <AccountBalanceWalletIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={'账单'} secondary="记一笔" />
                        </ListItem>
                        <Divider />
                        <ListItem button key='筛选' onClick={() => { setChose(1); }}>
                            <ListItemIcon >
                                <SearchIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={'筛选'} secondary="账单明细筛选" />
                        </ListItem>
                        <Divider />
                        <ListItem button key='统计' onClick={() => { setChose(2); }}>
                            <ListItemIcon >
                                <AssessmentIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={'统计'} secondary="账单明细统计分析" />
                        </ListItem>
                        <Divider />
                        <ListItem button key='社区' onClick={() => { setChose(3); }}>
                            <ListItemIcon >
                                <ForumIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={'社区'} secondary="有趣的发现" />
                        </ListItem>
                        <Divider />
                        <ListItem button key='设置' onClick={() => { setChose(4); }}>
                            <ListItemIcon >
                                <SettingsIcon color="primary" fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary={'设置'} secondary="Settings~" />
                        </ListItem>
                        <Divider />
                    </List>
                </Drawer>

                {/* 主窗口内容 
                    0：MainPage: 账单主页
                    1：SearchPage: 账单明细条件筛选
                    2：AnlayzePage: 账单明细统计分析
                    3：Community: 社区（开发ing）
                    4：ettingPage: 相关设置
                    【使用三目运算符切换】
                */}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {chose == 0 ? <MainPage /> :
                        chose == 1 ? <SearchPage /> :
                            chose == 2 ? <AnlayzePage /> :
                                chose == 3 ? <Community /> :
                                    <SettingPage />}
                </main>
            </div>
        </ThemeProvider >
    );
}
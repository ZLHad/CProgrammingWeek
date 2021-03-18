// 筛选页
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
// 筛选组件
import SearchContent from './SearchContent';
import SearchFilter from './SearchFilter';

// 带有搜索输入框的应用栏 App Bar
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

// 封装导出组件SearchPage
export default function SearchPage() {
    const classes = useStyles();
    const [searchWord, setSearchWord] = React.useState("");
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [moneyRange, setMoneyRange] = React.useState([0, 100]);
    const [typeValue, setTypeValue] = React.useState('选择类型...');
    const [startDate, setStartDate] = React.useState(Date());
    const [endDate, setEndDate] = React.useState(Date());
    const [state, setState] = React.useState({
        dateChecked: false,
        typeChecked: false,
        moneyChecked: false,
    });
    const [order, setOrder] = React.useState('按日期排序');

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { setFilterOpen(true) }}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Typography className={classes.title} style={{ fontSize: '1.15rem' }} noWrap>
                        搜索
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="输入以搜索…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchWord}
                            onChange={(text) => { setSearchWord(text.target.value) }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {/* 筛选内容 */}
            <SearchContent
                keyWord={searchWord}
                state={state}
                moneyRange={moneyRange}
                typeValue={typeValue}
                startDate={startDate}
                endDate={endDate}
                order={order}
            />
            {/* 筛选条件 */}
            <SearchFilter
                open={filterOpen} setOpen={setFilterOpen}
                moneyRange={moneyRange} setMoneyRange={setMoneyRange}
                typeValue={typeValue} setTypeValue={setTypeValue}
                startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}
                state={state} handleChange={handleChange}
                order={order} setOrder={setOrder}
            />
        </div>
    );
}

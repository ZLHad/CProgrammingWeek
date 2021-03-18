// Main账单页Header部分组件
import React from 'react';
import Box from '@material-ui/core/Box';

// App Bar 应用栏组件
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// 日期组件
// https://material-ui.com/zh/components/pickers/
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const datePickerTheme = createMuiTheme({
    // palette: {
    //     primary: {
    //         main: '#0044ff',
    //     },
    // },
    palette: {
        primary: {
            // 黄
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: '#fff',
        }
    }
});

const usezStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    bar: {
        backgroundColor: "rgba(0,230,118,0.75)",
    },
    title: {
        flexGrow: 1,
        display: 'block',
        color: "rgba(0, 0, 0, 0.54)",
    },
    money: {
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 0,
        color: 'black',
    },
    moneyValue: {
        fontSize: 24,
    },
    void: {
        flexGrow: 1,
        display: 'block',
    },
}));

// 封装导出组件MainHeader
export default function MainHeader() {
    const classes = usezStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-10-02T21:11:54'));
    // 账单金额：localStorage
    const [tot, setTot] = React.useState(() => {
        let tmp = localStorage.getItem('tot');
        if (tmp != null) return JSON.parse(tmp);
        else {
            localStorage.setItem('tot', JSON.stringify([0, 0]));
            return [0, 0];
        }
    });
    const [UT, setUT] = React.useState(() => {
        let tmp = localStorage.getItem('UT');
        if (tmp != null) return parseInt(JSON.parse(tmp));
        else {
            localStorage.setItem('UT', 0);
            return 0;
        }
    });
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    React.useEffect(() => {
        let now = parseInt(localStorage.getItem("UT"));
        if (UT < now) {
            setTot(JSON.parse(localStorage.getItem("tot")));
            setUT(now);
        }
    }, [UT]);
    return (
        // 简单的应用栏组件部分
        <AppBar position="static" color='primary' className={classes.bar} >
            <Toolbar style={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)" }}>
                <ThemeProvider theme={datePickerTheme}>

                    {/* 日期部分组件 */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="日期"
                            format="yyyy/MM"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>

                {/* 右侧支出收入部分 */}
                <Typography className={classes.void} />
                <Box className={classes.money}>
                    <Typography className={classes.title} noWrap>支出<br /></Typography>
                    <Typography className={classes.moneyValue} noWrap>
                        {tot[0]}
                    </Typography>
                </Box>
                <Box className={classes.money}>
                    <Typography className={classes.title} noWrap>收入<br /></Typography>
                    <Typography className={classes.moneyValue} noWrap>
                        {tot[1]}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar >
    );
}

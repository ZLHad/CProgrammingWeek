// 账单明细展示页-包括修改对话框
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { Typography, ButtonBase } from '@material-ui/core';
import Storage from './Storage';
// 对话框
// 对话框将一个任务告知给用户，它承载了一些需要用户进行确认的关键信息或者多个任务
// 这里算是表单对话框
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// 日期组件
// https://material-ui.com/zh/components/pickers/
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100vh - 116px)',
        // backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    subheader: {
        flexGrow: 1,
        display: 'block',
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "0.875rem",
        paddingTop: '18px',
        lineHeight: "24px",
    },
    listitem: {
        flexGrow: 1,
        display: 'block',
        fontSize: "1rem",
        lineHeight: "48px",
        fontFamily: "sans-serif",
    },
    fabButton: {
        position: 'fixed',
        zIndex: 99999,
        bottom: '40px',
        right: '50vw',
        color: 'white',
        // margin: '0 auto',
    },
}));

// 封装导出组件AccountDisplay
export default function AccountDisplay(props) {
    // localStorage读
    const [ALData, setALData] = useState(JSON.parse(localStorage.getItem("data")));
    const [Days, setDays] = useState(JSON.parse(localStorage.getItem("days")));
    const [UT, setUT] = useState(localStorage.getItem("UT"));
    const classes = useStyles();

    // render更新
    useEffect(() => {
        let now = parseInt(localStorage.getItem("UT"));
        if (UT < now) {
            setALData(JSON.parse(localStorage.getItem("data")));
            setDays(JSON.parse(localStorage.getItem("days")));
            setUT(now);
        }
    }, [UT]);

    // 模态框
    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [typeOfNew, setTypeOfNew] = React.useState(null);
    const [money, setMoney] = React.useState(0);
    const [content, setContent] = React.useState('');
    const [nowe, setNowe] = React.useState(0);
    const handleRecordOpen = (name, e) => {
        setNowe(name);
        setSelectedDate(ALData[name].date);
        setContent(ALData[name].content);
        setTypeOfNew(ALData[name].type);
        setMoney(Math.abs(ALData[name].money));
        setOpenModal(true);
    };
    // 取消修改
    const handleRecordClose = () => {
        setOpenModal(false);
    };
    // 删除数据
    const handleDelRecord = () => {
        Storage.delRecord(nowe);
        setOpenModal(false);
    };
    // 修改数据
    const handleNewRecordClose = () => {
        Storage.modifyRecord(nowe, ALData[nowe].no, selectedDate, content, typeOfNew, money);
        handleRecordClose();
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Box style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
            <List className={classes.root} subheader={<li />}>
                {Days == null ? (
                    <Typography style={{ marginTop: 'calc(50vh - 116px)', fontSize: '1.5rem' }}>
                        请点击右下角“+”按钮，开始你的第一笔记录吧~
                    </Typography>) :

                    // 通过map进行日期遍历
                    Days.map((items) => {
                        let dt = new Date(items[0]);
                        let getCh = ['日', '一', '二', '三', '四', '五', '六']
                        return (
                            <li key={`${('00000' + (dt.getMonth() + 1)).slice(-2)}-${('00000' + (dt.getDate())).slice(-2)}`} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader style={{ display: 'flex' }}>
                                        <Typography className={classes.subheader}>
                                            {`${('00000' + (dt.getMonth() + 1)).slice(-2)}月${('00000' + (dt.getDate())).slice(-2)}日  星期${getCh[dt.getDay()]}`}
                                        </Typography>
                                        <Typography style={{ width: 'auto', flexGrow: 100, }}>{""}
                                        </Typography>
                                        {
                                            items[1] > 0 &&
                                            <Typography style={{ paddingRight: '6px' }} className={classes.subheader}>
                                                {`支出：${items[1]}`}
                                            </Typography>
                                        }
                                        {
                                            items[2] > 0 &&
                                            <Typography className={classes.subheader}>
                                                {`收入：${items[2]}`}
                                            </Typography>
                                        }
                                    </ListSubheader>
                                    <Divider />
                                    {items.map((item, index) => {
                                        if (index > 2) {
                                            let i = Math.min(item, ALData.length - 1);
                                            while (ALData[i].no > item) --i;
                                            return (
                                                <ButtonBase style={{ width: '100%' }} onClick={(e) => handleRecordOpen(i, e)}>
                                                    <ListItem key={`item-${items[0]}-${item}`}>
                                                        <Typography className={classes.listitem}>
                                                            {ALData[i].content == "" ? ALData[i].type : ALData[i].content}
                                                        </Typography>
                                                        <Typography style={{ width: 'auto', flexGrow: 100, }}>{""}
                                                        </Typography>
                                                        <Typography className={classes.listitem} >
                                                            {`${ALData[i].money}`}
                                                        </Typography>
                                                        {/* <ListItemText primary={`${ALData[item].content}`} /> */}
                                                    </ListItem>
                                                </ButtonBase>
                                            );
                                        }
                                    })}
                                </ul>
                            </li >
                        );
                    })}
            </List >
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={props.open}>
                <AddIcon />
            </Fab>

            {/* 对话框/模态框 */}
            <Dialog open={openModal} onClose={handleRecordClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">修改</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        类型：{() => { console.log(nowe); try { return ALData[nowe].type; } catch (err) { return ""; } }}
                    </DialogContentText>
                    <div style={{ display: 'inline' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: 'inline', width: '50%' }}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="日期"
                                format="yyyy/MM/dd"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            style={{ top: '11px', left: '20px', width: '50%' }}
                            autoFocus
                            margin="dense"
                            id="money"
                            label="金额"
                            type="number"
                            value={money}
                            onChange={(text) => { setMoney(text.target.value) }}
                        />
                    </div>
                    <TextField
                        margin="dense"
                        id="content"
                        label="账单备注"
                        type="search"
                        value={content}
                        onChange={(text) => { setContent(text.target.value) }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelRecord} color="#f44336">
                        删除
                    </Button>
                    <Button onClick={handleRecordClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleNewRecordClose} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}
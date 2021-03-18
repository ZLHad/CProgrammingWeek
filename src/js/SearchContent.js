// 筛选结果页
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

// List组件
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { Typography, ButtonBase } from '@material-ui/core';
import Storage from './Storage'


// 组件效果如AccountDisplay
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100vh - 108px)',
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
}));

// 封装导出组件AccountDisplay（筛选页）
export default function AccountDisplay(props) {
    const [ALData, setALData] = useState(JSON.parse(localStorage.getItem("data")));
    const [Days, setDays] = useState(JSON.parse(localStorage.getItem("days")));
    const [UT, setUT] = useState(localStorage.getItem("UT"));
    const classes = useStyles();
    // 获取筛选方式：三种筛选条件+排序方式
    const getFilter = () => {
        let ans = "";
        if (props.keyWord != "") ans += "关键字:" + props.keyWord + ";";
        if (props.state.dateChecked) ans += "日期范围:" + Storage.getDateText(props.startDate) + "~" + Storage.getDateText(props.endDate) + ";    ";
        if (props.state.typeChecked) ans += "类型:" + props.typeValue + ";    ";
        if (props.state.moneyChecked) ans += "金额范围:" + props.moneyRange[0] + "~" + props.moneyRange[1] + ";    ";
        return (ans == "" ? "还没有条件被筛选" : ans) + "(排序方式:" + props.order + ")";
    }

    useEffect(() => {
        let now = parseInt(localStorage.getItem("UT"));
        if (UT < now) {
            setALData(JSON.parse(localStorage.getItem("data")));
            setDays(JSON.parse(localStorage.getItem("days")));
            setUT(now);
        }
    }, [UT]);

    // 获取筛选结果
    const getList = () => {
        let data = [];
        let shou = 0, zhi = 0;
        if (ALData == null) return "这里空空如也，快去记一笔吧~";
        // 遍历list
        ALData.map((item) => {
            if (props.state.dateChecked && !Storage.dateIn(props.startDate, props.endDate, item.date)) return;
            if (props.state.typeChecked) {
                if ((props.typeValue.substr(0, 2) == "支出") != (item.money < 0)) return;
                if (props.typeValue.substr(3, props.typeValue.length - 3) != item.type) return;
            }
            if (props.state.moneyChecked) {
                let _money = Math.abs(item.money);
                if (_money < props.moneyRange[0] || _money > props.moneyRange[1]) return;
            }
            data.push(item);
            if (item.money < 0) zhi -= item.money;
            else shou += item.money;
        });
        if (data.length == 0) return "没有找到任何结果...";
        // console.log(props.order);
        if (props.order == "按日期排序") data = Storage.sortByDate(data);
        else if (props.order == "按金额排序") data = Storage.sortByMoney(data);
        else data = Storage.sortByContent(data);
        // console.log("233");

        return (<div>
            <Typography className={classes.listitem}>
                {`支出：${shou}  收入：${zhi}   结余: ${shou - zhi}`}
            </Typography>
            {data.map((items) => {
                return (
                    // <ButtonBase style={{ width: '100%' }} >
                    <ListItem>
                        <Typography className={classes.listitem}>
                            {`${items.content}`}
                        </Typography>
                        <Typography className={classes.listitem}>
                            {`${items.type}`}
                        </Typography>
                        <Typography className={classes.listitem}>
                            {Storage.getDateText(items.date)}
                        </Typography>
                        <Typography style={{ width: 'auto', flexGrow: 100, }}>{""}
                        </Typography>
                        <Typography className={classes.listitem} >
                            {`${items.money}`}
                        </Typography>
                    </ListItem>
                    // </ButtonBase>
                );
            })}
        </div>);
    }

    return (
        <Box style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
            <List className={classes.root} subheader={<li />}>
                <ListSubheader style={{ display: 'flex', marginTop: '10px' }}>
                    <Typography >
                        目前已筛选条件: {getFilter()}
                    </Typography>
                </ListSubheader>
                {getList()}
            </List >
            {/* <Dialog open={openModal} onClose={handleRecordClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">修改</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        类型：{() => { try { return ALData[nowe].type; } catch (err) { return ""; } }}
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
                    <Button onClick={handleRecordClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleNewRecordClose} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box >
    );
}
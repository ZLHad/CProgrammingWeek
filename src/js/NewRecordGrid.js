// 新建账单及对话框
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// 栅格Grid List网格列表组件，收入/支出类型排列
import GridList from '@material-ui/core/GridList';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTile from '@material-ui/core/GridListTile';

//  对话框
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
import Storage from "./Storage";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0)',
        '& ul': {
            width: '100%',
        }
    },
    gridtile: {

    },
    button: {
        width: '100%',
        height: '100%',
    },
}));


// 封装导出组件NewRecordGrid
export default function NewRecordGrid(props) {
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [typeOfNew, setTypeOfNew] = React.useState(null);
    const [money, setMoney] = React.useState(0);
    const [content, setContent] = React.useState('');
    const handleRecordOpen = (name, e) => {
        setTypeOfNew(name);
        setOpenModal(true);
    };

    // 取消
    const handleRecordClose = () => {
        setTypeOfNew(null);
        setOpenModal(false);
        setMoney(0);
        setContent('');
    };

    // 新增，记录进LocalStorage
    const handleNewRecordClose = () => {
        Storage.addRecord(selectedDate, content, typeOfNew, money, props.type);
        handleRecordClose();
        props.apply(false);
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>

            {/* GridList网格列表 */}
            <GridList cellHeight={60} className={classes.gridList} cols={4}>
                {props.items.map((tile) => (
                    <GridListTile key={tile} className={classes.gridtile} cols={1}>
                        <ButtonBase className={classes.button} onClick={(e) => handleRecordOpen(tile, e)}>{tile}</ButtonBase>
                    </GridListTile>
                ))}
            </GridList>

            {/* 对话框 */}
            <Dialog open={openModal} onClose={handleRecordClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新增</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`类型：${typeOfNew}`}
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
            </Dialog>
        </div >);
}
// 筛选对话框组件
import React from 'react';
import Button from '@material-ui/core/Button';
// 对话框
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// 滑块组件
import Slide from '@material-ui/core/Slide';
// 日期组件
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// 单选框组件
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
// 栅格组件
import { Grid, Divider } from '@material-ui/core';
// 类型和金额选择组件
import TypeChose from './Filter-TypeChose';
import MoneyChose from './Filter-MoneyChose';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchFilter(props) {

    const handleClose = () => {
        props.setOpen(false);
    };
    const handleChange = (event) => {
        props.setOrder(event.target.value);
    };
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-slide-title">设置筛选</DialogTitle>
            <DialogContent>{/*  */}
                <DialogContentText id="alert-dialog-slide-description">
                    选择筛选条件以继续...
                </DialogContentText>
                {/* 复选框组件 */}
                <FormControlLabel
                    style={{ width: '100%' }}
                    control={<Checkbox checked={props.state.dateChecked} onChange={props.handleChange} name="dateChecked" />}
                    label="使用日期范围筛选"
                />
                {/* 选择日期范围筛选则显示 */}
                <Grid container spacing={3} style={{ display: props.state.dateChecked ? '' : 'none' }}>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="起始日期"
                                format="yyyy/MM/dd"
                                value={props.startDate}
                                onChange={(date) => props.setStartDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="终止日期"
                                format="yyyy/MM/dd"
                                value={props.endDate}
                                onChange={(date) => props.setEndDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Divider />
                {/* 类型筛选组件 */}
                <FormControlLabel
                    style={{ width: '100%' }}
                    control={<Checkbox checked={props.state.typeChecked} onChange={props.handleChange} name="typeChecked" />}
                    label="使用类型筛选"
                />

                {/* TypeChose组件-显示所有账单类型 */}
                {props.state.typeChecked ?
                    <TypeChose value={props.typeValue} setValue={props.setTypeValue} />
                    :
                    <Divider />
                }
                {/* 使用金额筛选 */}
                <FormControlLabel
                    style={{ width: '100%' }}
                    control={<Checkbox checked={props.state.moneyChecked} onChange={props.handleChange} name="moneyChecked" />}
                    label="使用金额筛选"
                />
                {/* MoneyChose组件-使用金额筛选-滑块组件 */}
                {props.state.moneyChecked ?
                    <MoneyChose value={props.moneyRange} setValue={props.setMoneyRange} />
                    :
                    ""
                }
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ paddingTop: '12px' }}>排序方式</FormLabel>
                    {/* 单选框组件 */}
                    <RadioGroup name="1" value={props.order} onChange={handleChange}>
                        <FormControlLabel value="按日期排序" control={<Radio />} label="按日期排序" />
                        <FormControlLabel value="按金额排序" control={<Radio />} label="按金额排序" />
                        <FormControlLabel value="按内容/类型排序" control={<Radio />} label="按内容/类型排序" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    应用
                </Button>
            </DialogActions>
        </Dialog>
    );
}

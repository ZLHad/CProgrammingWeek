// 新增账单
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

// 选项卡组件
// https://material-ui.com/zh/components/tabs/
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// 引入账单类型网格列表
import NewRecordGrid from './NewRecordGrid';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "rgba(255,255,255,0.8)",
        width: 'auto',
    },
    bar: {
        backgroundColor: "rgba(255,255,255,0.2)",
        height: '72px',
    },
    tab: {
        height: 'calc(100vh - 116px)',
    },
}));

const expense = ["餐饮", "购物", "日用", "交通", "超市", "水果", "零食", "运动", "娱乐", "通讯", "服饰", "理发", "住房", "居家", "孩子", "长辈", "社交", "旅行", "烟酒", "数码", "汽车", "医疗", "书籍", "学习", "宠物", "红包", "礼物", "办公", "维修", "捐赠", "彩票", "亲友", "快递", "文具", "其他"];
const income = ["工资", "奖金", "理财", "红包", "其他"];
export default function NewRecord(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [expenseType, setExpenseType] = React.useState(() => {
        if (localStorage.getItem('expensetype') == null)
            localStorage.setItem('expensetype', JSON.stringify(expense));
        return JSON.parse(localStorage.getItem('expensetype'))
    });
    const [incomeType, setIncomeType] = React.useState(() => {
        if (localStorage.getItem('incometype') == null)
            localStorage.setItem('incometype', JSON.stringify(income));
        return JSON.parse(localStorage.getItem('incometype'))
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    React.useEffect(() => { });
    if (!props.open) {
        return null;
    }
    return (
        <div className={classes.root}>
            {/* 顶部应用栏、选项卡 */}
            <AppBar position="static" color="default" className={classes.bar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab style={{ paddingTop: '27px', height: '72px', fontSize: "1.15rem" }} label="支出" {...a11yProps(0)} />
                    <Tab style={{ paddingTop: '27px', height: '72px', fontSize: "1.15rem" }} label="收入" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            {/* 类型展示组件 */}
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {/* NewRecordGrid为栅格排列的类型组件，传递收入/支出、类型（income Type/expense Type） */}
                <TabPanel value={value} index={0} className={classes.tab} dir={theme.direction}>
                    <NewRecordGrid items={expenseType} apply={props.apply} type={-1} />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tab} dir={theme.direction}>
                    <NewRecordGrid items={incomeType} apply={props.apply} type={1} />
                </TabPanel>
            </SwipeableViews>
        </div >);
}
// 账单页（抽屉1）-首页
import React from 'react';
// 引入material-ui
import { makeStyles } from '@material-ui/core/styles';
// CSS Baseline 基线
import CssBaseline from '@material-ui/core/CssBaseline';
// Material Design 响应式布局的栅格（Grid）可适应屏幕大小和方向，确保布局在不同尺寸之间的一致性。
import Grid from '@material-ui/core/Grid';
// 账单明细显示组件
import AccountDisplay from './AccountDisplay';


// 页面投头部组件
import MainHeader from './MainHeader';
// 新增账单组件
import NewRecord from './NewRecord';

// 自适应布局模块
// https://material-ui.com/zh/components/grid/
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
}));

// 封装导出组件MainPage
export default function MainPage() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className={classes.root}>

            {/* 栅格式布局Grid容器 */}
            <Grid container>
                <Grid item xs={6}>
                    <MainHeader />
                    <AccountDisplay open={handleChange} />
                </Grid>
                <CssBaseline />

                {/* 新增账单 */}
                <Grid item xs={6}>
                    <NewRecord open={checked} apply={setChecked} />
                </Grid>
            </Grid>
        </div>
    );
}
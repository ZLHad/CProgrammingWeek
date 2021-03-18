// Setting页面
import React from 'react';
import { Box, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// excel插件
import XLSX from 'xlsx';
import Storage from './Storage'
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100vh - 44px)',
        // backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

// 读取excel账本
function importExcel(file) {

    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
        try {
            const { result } = event.target;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' });
            let data = []; // 存储获取到的数据
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 只取第一张表
                }
            }
            console.log(data[0]);
            data.map((item) => {
                let _yr = parseInt(item.date.substr(0, 4));
                let _month = parseInt(item.date.substr(5, 2)) - 1;
                let _day = parseInt(item.date.substr(8, 2));
                let _date = new Date(_yr, _month, _day);
                Storage.addRecord(_date, item.content, item.typo, item.money, item.type == "支出" ? -1 : 1);
            });
            return;
        } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            console.log('文件类型不正确');
            return;
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);

}

// 导出excel
function exportExcel(fileName) {
    const wb = XLSX.utils.book_new();
    let data1 = JSON.parse(localStorage.getItem('data'));
    const sheetData1 = data1.map(item => ({
        'content': item.content,
        'money': Math.abs(item.money),
        'date': Storage.getDateText(item.date),
        'typo': item.type,
        'type': item.money < 0 ? "支出" : "收入"
    }));
    const sheet1 = XLSX.utils.json_to_sheet(sheetData1);
    XLSX.utils.book_append_sheet(wb, sheet1, '');
    // 导出 Excel
    XLSX.writeFile(wb, fileName);
}

export default function SettingPage() {

    const classes = useStyles();
    const [value, setValue] = React.useState("");
    return (<Box style={{ backgroundColor: 'rgba(255,255,255,0.80)' }} >
        <List className={classes.root} subheader={<li />}>
            <Button variant="contained" color="secondary" >
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { importExcel(e) }} />
            </Button>

            <Button type="primary" variant="contained" color="primary" onClick={() => { exportExcel("账本.xlsx") }}>导出</Button>
            {/* <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="设置预算" />
                （当超出预算80%或与上月同期消费相差较大时，系统会自动给出预警）
            </form> */}
            {/* <Button type="primary" variant="contained" color="primary" onClick={() => {
                var n = new Notification("Warning!", { body: "费用超支！", icon: "https://wiki.sukasuka.cn/images/c/cc/Chtholly_Small.png" });
            }}>导出</Button> */}
            <Button type="primary" variant="contained" color="primary" onClick={() => {
                var n = new Notification("导入Excel...", { body: "读取失败！", icon: "https://wiki.sukasuka.cn/images/c/cc/Chtholly_Small.png" });
            }}>导入</Button>
        </List>

    </Box >);
}                                                                                                           
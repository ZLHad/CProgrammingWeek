// 金额筛选
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// 滑块组件
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});



export default function MoneyChose(props) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                金额范围
            </Typography>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
            />
        </div>
    );
}

const DayEqual = (timeStampA, timeStampB) => {
    let dateA = new Date(timeStampA);
    let dateB = new Date(timeStampB);
    return (dateA.setHours(0, 0, 0, 0) === dateB.setHours(0, 0, 0, 0));
}

const getJSON = (name) => {
    return JSON.parse(localStorage.getItem(name));
}

const saveJSON = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
    return;
}

const dateIn = (dateA, dateB, dateC) => {
    let da = new Date(dateA);
    let db = new Date(dateB);
    let dc = new Date(dateC);
    return (da.setHours(0, 0, 0, 0) <= dc.setHours(0, 0, 0, 0) && db.setHours(0, 0, 0, 0) >= dc.setHours(0, 0, 0, 0));
}
const sortDays = function (nums, s = 0, e = nums.length - 1, l = s, r = e) {
    if (s > e) return;
    let p = nums[s][0];
    while (l < r) {
        while (l < r && nums[r][0] <= p) r--;
        while (l < r && nums[l][0] >= p) l++;
        [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    [nums[l], nums[s]] = [nums[s], nums[l]];
    sortDays(nums, s, l - 1);
    sortDays(nums, l + 1, e);
    return nums;
};

const sortByDate = function (nums, s = 0, e = nums.length - 1, l = s, r = e) {
    if (s > e) return;
    let p = nums[s].date;
    while (l < r) {
        while (l < r && nums[r].date <= p) r--;
        while (l < r && nums[l].date >= p) l++;
        [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    [nums[l], nums[s]] = [nums[s], nums[l]];
    sortByDate(nums, s, l - 1);
    sortByDate(nums, l + 1, e);
    return nums;
};
const sortByMoney = function (nums, s = 0, e = nums.length - 1, l = s, r = e) {
    if (s > e) return;
    let p = nums[s].money;
    while (l < r) {
        while (l < r && nums[r].money <= p) r--;
        while (l < r && nums[l].money >= p) l++;
        [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    [nums[l], nums[s]] = [nums[s], nums[l]];
    sortByMoney(nums, s, l - 1);
    sortByMoney(nums, l + 1, e);
    return nums;
};

const sortByContent = function (nums, s = 0, e = nums.length - 1, l = s, r = e) {
    if (s > e) return;
    let p = nums[s].content;
    while (l < r) {
        while (l < r && nums[r].content <= p) r--;
        while (l < r && nums[l].content >= p) l++;
        [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    [nums[l], nums[s]] = [nums[s], nums[l]];
    sortByContent(nums, s, l - 1);
    sortByContent(nums, l + 1, e);
    return nums;
};


const addRecord = (date, content, typo, money, type) => {
    try {
        let ut = parseInt(localStorage.getItem('UT')) + 1 || 1;
        let _ALData = getJSON('data') || [];
        let _Days = getJSON('days') || [];
        let _tot = getJSON('tot');
        _ALData.push({
            no: ut,
            date: date,
            content: content,
            type: typo,
            money: type * money,
        });
        let i = 0, flag = 0;
        for (; i < _Days.length; ++i)
            if (DayEqual(_Days[i][0], date)) {
                flag = 1;
                _Days[i].push(ut);
                _Days[i][1] += money * (type === -1);
                _Days[i][2] += money * (type === 1);
                break;
            }
        if (!flag) _Days.splice(i, 0, [date, money * (type === -1), money * (type === 1), ut]);
        if (_Days.length > 0) _Days = sortDays(_Days);
        _tot[0] += money * (type === -1);
        _tot[1] += money * (type === 1);
        saveJSON('days', _Days);
        saveJSON('data', _ALData);
        saveJSON('tot', _tot);
        localStorage.setItem('UT', ut);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const modifyRecord = (index, no, date, content, typo, money) => {
    try {
        let ut = parseInt(localStorage.getItem('UT')) + 1;
        let _ALData = getJSON('data');
        let _tot = getJSON('tot');
        let _type = _ALData[index].money < 0 ? -1 : 1;
        let _money = Math.abs(_ALData[index].money);
        let _Days = getJSON('days');
        let _date = _ALData[index].date;
        _tot[0] += -_money * (_type === -1) + money * (_type === -1);
        _tot[1] += -_money * (_type === 1) + money * (_type === 1);
        for (let i = 0; i < _Days.length; ++i)
            if (DayEqual(_Days[i][0], _date)) {
                _Days[i][1] -= _money * (_type === -1);
                _Days[i][2] -= _money * (_type === 1);
                for (let j = _Days[i].length; j > 2; --j)
                    if (_Days[i][j] === no) {
                        _Days[i].splice(j, 1);
                        break;
                    }
                if (_Days[i].length <= 3) _Days.splice(i, 1);
                break;
            }
        let i = 0, flag = 0;
        for (; i < _Days.length; ++i)
            if (DayEqual(_Days[i][0], date)) {
                flag = 1;
                _Days[i].push(no);
                _Days[i][1] += money * (_type === -1);
                _Days[i][2] += money * (_type === 1);
                break;
            }
        if (!flag) _Days.splice(i, 0, [date, money * (_type === -1), money * (_type === 1), ut]);
        _ALData[index] = {
            no: no,
            date: date,
            content: content,
            type: typo,
            money: _type * money,
        };
        if (_Days.length > 0) _Days = sortDays(_Days);
        saveJSON('days', _Days);
        saveJSON('data', _ALData);
        saveJSON('tot', _tot);
        localStorage.setItem('UT', ut);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const delRecord = (index) => {
    try {
        let ut = parseInt(localStorage.getItem('UT')) + 1;
        let _ALData = getJSON('data');
        let _tot = getJSON('tot');
        let _Days = getJSON('days');
        let _type = _ALData[index].money < 0 ? -1 : 1;
        let _money = Math.abs(_ALData[index].money);
        let _date = _ALData[index].date;
        let no = _ALData[index].no;
        _tot[0] -= _money * (_type === -1);
        _tot[1] -= _money * (_type === 1);
        for (let i = 0; i < _Days.length; ++i)
            if (DayEqual(_Days[i][0], _date)) {
                _Days[i][1] -= _money * (_type === -1);
                _Days[i][2] -= _money * (_type === 1);
                for (let j = 3; j < _Days[i].length; ++j)
                    if (_Days[i][j] === no) {
                        _Days[i].splice(j, 1);
                        break;
                    }
                if (_Days[i].length <= 3) _Days.splice(i, 1);
                break;
            }
        _ALData.splice(index, 1);
        saveJSON('days', _Days);
        saveJSON('data', _ALData);
        saveJSON('tot', _tot);
        localStorage.setItem('UT', ut);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const getDateText = (_date) => {
    let date = new Date(_date);
    return date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2);
}
export default Storage = { addRecord, modifyRecord, delRecord, getDateText, dateIn, sortByDate, sortByMoney, sortByContent }
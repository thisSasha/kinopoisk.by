export { MMath }
let MMath = Math;
MMath.order = function (order, howMany, system) {
    let ord;
    if (order.length == 2) {
        if (system == '*' || system == '/' || system == undefined) {
            ord = order[0] / order[1];
        } else if (system == '+' || system == '-' || system == '+/-') {
            ord = order[0] - order[1];
        };
    };
    let num = order;
    let old = num[num.length - 1];
    for (let i = 0; i < howMany; i++) {
        if (system == '*' || system == '/' || system == undefined) {
            num.push(old / ord);
        } else if (system == '+' || system == '-' || system == '+/-') {
            num.push(old - ord);
        };
        old = num[num.length - 1];
    };
    return num;
};
MMath.mid = function (nums, type) {
    let ob = 0;
    for (let i = 0; i < nums.length; i++) {
        const el = nums[i];
        ob += el;
    };
    if (type === 'def' || type == undefined) {
        return ob / nums.length;
    } else if (type == 'roundUp') {
        return Math.floor(ob / nums.length);
    };
};
MMath.roundUp = function (number, before) {
    if (typeof before == 'object') {
        if (MMath.mid([before[0], before[1]]) > number) {
            return before[0]
        } else {
            return before[1]
        };
    } else if (before == undefined || before == 10 || before == '10') {
        let n = number.toString().substring(1);
        if (n > 4) {
            return Number(number.toString().substring(0, 1) + 0) + 10;
        } else {
            return number.toString().substring(0, 1) + 0;
        };
    } else if (before == 5 || before == '5'){
        let n = number.toString().substring(1);
        if (n > 2 && n < 8) {
            return Number(number.toString().substring(0, 1) + 5);
        } else if(n==1 || n==2){
            return Number(number.toString().substring(0, 1) + 0);
        } else {
            return Number(number.toString().substring(0, 1) + 0)+10;
        };
    };
};
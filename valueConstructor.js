export { ValueObject }
function ValueObject(params) {
    this.value = params.value;
    this.object = params.object;
    function checkDefaultText(thi) {
        let x = params.defaultText.split('&');
        x.forEach(el => {
            if (el == 'value') {
                x[x.indexOf(el)] = thi.value;
                x = x.join(' ');
            };
        });

        thi.defaultText = x;
        thi.object.innerHTML = thi.defaultText;
    };
    checkDefaultText(this);
    this.substractValue = function (value) {
        this.value -= value;
        this.object.innerHTML = this.defaultText;
        checkDefaultText(this);
    };
    this.setValue = function (value) {
        this.value = value;
        this.object.innerHTML = this.defaultText;
        checkDefaultText(this);
    };
    this.addValue = function (value) {
        this.value += value;
        checkDefaultText(this);
    };
};
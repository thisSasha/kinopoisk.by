export { ValueObject }
function ValueObject(params) {
    this.value = params.value;
    this.object = params.object;
    this.defaultText = params.defaultText;
    this.object.innerHTML = this.defaultText;
    this.setValue = function (value) {
        this.value = value;
        this.object.innerHTML = this.defaultText;
    };
};
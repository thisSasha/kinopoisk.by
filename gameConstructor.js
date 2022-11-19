export { Layout, TagBlock, pr, hideMiniWarning, selectLayout }

let warning = true;

let pr/* print */ = function (text) {
    console.log(text);
};
let prM/* print many*/ = function (...text) {
    console.log(text);
};
let miniWarnig /* warning */ = function (text) {
    if (warning == true) {
        console.warn(text);
    };
};
let hideMiniWarning = function () {
    warning = false;
};
let selectLayout = function (layout) {
    let x = 0;
    let selectedLayoutNum;
    for (let i = 0; i < layouts.length; i++) {
        let el = layouts[i];
        if (layout == el.name) {
            x++;
            selectedLayoutNum = i;
        };
    };
    if (x == 0) {
        console.error('layoutIsNotDefined#selectLayout. Такого Лэйаута не существует.');
    } else {
        for (let i = 0; i < layouts.length; i++) {
            layouts[i].object.style.visibility = 'hidden'
        };
        layouts[selectedLayoutNum].object.style.visibility = '';
    };
};
document.body.style.overflowY = 'hidden';
document.body.style.padding = 0;
document.body.style.margin = 0;
document.body.style.position = 'relative';
let layouts = [];
let defaultLayout = null;
let tagBlockPlugins = {
    'solid': {
        'setSolid': function (trueOrFalse) {
            if (trueOrFalse == true) {
                this.power = true;
            } else if (trueOrFalse == false) {
                this.power = false;
            } else {
                console.error('incorrectType. Вы указали неверный тип данных. {Разрешены true или false}');
            };
        },
        'getSolid': function () {
            return this.power;
        },
        'power': 'powerIsNot'
    },
};
function importPlugin(plugin, obj) {
    obj['plugins'][plugin] = tagBlockPlugins[plugin];
};
function Layout(params) {
    if (params.name == undefined) {
        console.error('requiredParameter. Обязательный параметр name в параметрах данного обьекта');
        return;
    };
    for (let i = 0; i < layouts.length; i++) {
        const element = layouts[i];
        if (element.name == params.name) {
            console.error(`equalObjectName. Имена обьектов совпадают ${element.object}`)
            return;
        }
    }
    let layoutGameConstructorObject = document.createElement('div');
    this.name = params.name;
    this.style = params.style;
    layoutGameConstructorObject.style.position = 'absolute';
    layoutGameConstructorObject.style.top = 0;
    if (defaultLayout == true) {
        layoutGameConstructorObject.style.visibility = 'hidden';
    }
    if (params.default == true) {
        this.default = true;
        defaultLayout = true;
        layoutGameConstructorObject.visibility = 'visible';
    };
    this.background = {
        'getType': function () {
            return this.type.toString();
        },
        'type': 'color',
        'setType': function (type) {
            if (type == 'color') {
                this.type = 'color';
            } else if (type == 'image') {
                this.type = 'image';
                this.setImageRepeat = function (trueOrFalse, repeatXorY = null) {
                    if (trueOrFalse == true) {
                        this.parentLayout.style.backgroundRepeat = `repeat`;
                        this.parentLayout.object.style.backgroundRepeat = `repeat`;
                        if (repeatXorY == 'x') {
                            this.parentLayout.style.backgroundRepeat += 'x';
                            this.parentLayout.object.style.backgroundRepeat += 'x';
                        } else if (repeatXorY == 'y') {
                            this.parentLayout.object.style.backgroundRepeat += 'y';
                            this.parentLayout.style.backgroundRepeat += 'y';
                        }
                    } else if (trueOrFalse == false) {
                        this.parentLayout.style.backgroundRepeat = 'no-repeat';
                        this.parentLayout.object.style.backgroundRepeat = 'no-repeat';
                    } else {
                        console.error('reqiredParameterIsNotAssign#setRepeat. Вы не указали значение параметру trueOrFalse');
                        return;
                    };
                };
                this.setImageSize = function (size) {
                    this.parentLayout.style.backgroundSize = size;
                    this.parentLayout.object.style.backgroundSize = size;
                };
                this.setImageId = function (wayBeforeImg) {
                    if (wayBeforeImg == undefined) {
                        console.error('reqiredParameterIsNotAssign#wayBeforeImg. Вы не указали значение параметру wayBeforeImg');
                        return;
                    };
                    this.image = wayBeforeImg;
                    this.parentLayout.object.style.backgroundImage = `url('${wayBeforeImg}')`;
                };
                this.image = undefined;
                if (this.image == undefined) {
                    this.parentLayout.object.style.backgroundImage = 'url(https://cdn0.iconfinder.com/data/icons/web-vol-2/50/Web_ARTBOARDS-60-1024.png)';
                    this.parentLayout.object.style.backgroundSize = '100vh';
                    this.parentLayout.object.style.backgroundRepeat = 'no-repeat';
                    this.parentLayout.object.style.backgroundPosition = 'center';
                };
            } else {
                console.error('incorrectType#InBackground. Тип фона не может равняться \'' + type + '\'.');
            };
        },
    };
    this.onclick = function (functionWhenClickThis) {
        this.object.onclick = functionWhenClickThis;
    };
    this.setInnerText = function (value) {
        this.innerText = value;
        this.object.innerHTML = value;
    };
    this.setAtributte = function (attribute, value) {
        this[attribute] = value;
        this.object[attribute] = value;
    };
    this.setStyle = function (style, value) {
        this.style[style] = value;
        this.object.style[style] = value;
    };
    this.background.parentLayout = this;
    layouts.push(this);
    layoutGameConstructorObject.id = this.name;
    layoutGameConstructorObject.style.width = '100vw';
    layoutGameConstructorObject.style.height = '100vh';
    if (this.style != undefined) {
        if (this.style.backgroundColor != undefined) {
            layoutGameConstructorObject.style.backgroundColor = this.style.backgroundColor;
        };
        if (this.style.color != undefined) {
            layoutGameConstructorObject.style.color = this.style.color;
        };
    };
    if (params.moreAttributes != undefined) {
        for (let i = 0; i < 99; i++) {
            if (Object.keys(params.moreAttributes)[i] == undefined) {
                i = 99;
            };
            layoutGameConstructorObject[Object.keys(params.moreAttributes)[i]] = Object.values(params.moreAttributes)[i];
        }
    };
    if (params.style != undefined) {
        for (let i = 0; i < 99; i++) {
            if (Object.keys(params.style)[i] == undefined) {
                i = 99;
            };
            layoutGameConstructorObject.style[Object.keys(params.style)[i]] = Object.values(params.style)[i];
        };
    };
    document.body.appendChild(layoutGameConstructorObject)
    this.object = layoutGameConstructorObject;
}
function TagBlock(params) {
    let blockGameConstructorObject = document.createElement('div');
    if (params.type != undefined) {
        this.tagName = params.type;
        blockGameConstructorObject = document.createElement(params.type);
    };
    if (params.name == undefined) {
        console.error('requiedParameter. Обязательный параметр name в параметрах данного обьекта');
        return;
    } else {
        this.nameId = params.name;
        blockGameConstructorObject.id = params.name;
    };

    this.plugins = {};
    this.set = {};
    this.display = [];
    this.style = params.style;

    for (let x = 0; x < Object.keys(params).length; x++) {
        this.set[Object.keys[x]] = function (value) {
            this[Object.keys[x]] = value;
            this.object[Object.keys[x]] = value;
        };
    };
    this.customProperties = params.customProperties;
    if (params.innerText != undefined) {
        this.innerText = params.innerText;
        blockGameConstructorObject.innerHTML = this.innerText;
        pr(blockGameConstructorObject)
    };


    this[tagBlockPlugins.solid] = params.solid;

    if (params.plugins != undefined) {
        for (let i = 0; i < params.plugins.length; i++) {
            importPlugin(params.plugins[i], this);
            if (params.plugins[i] == 'solid') {
                miniWarnig('incorrectPluginForIt. Предупреждаем, что плагин solid для TagBlock может работать неправильно.\\\
                Если вы хотите скрыть такие предупреждения напишите команду gc.hideMiniWarning().');
            };
        };
    };
    if (params.inputType != undefined) {
        this.type, blockGameConstructorObject.type = params.inputType;
    };
    if (params.placeholder != undefined) {
        this.placeholder, blockGameConstructorObject.placeholder = params.placeholder;
    };
    if (params.moreAttributes != undefined) {
        for (let i = 0; i < 99; i++) {
            if (Object.keys(params.moreAttributes)[i] == undefined) {
                i = 99;
            };
            blockGameConstructorObject[Object.keys(params.moreAttributes)[i]] = Object.values(params.moreAttributes)[i];
        }
    };
    if (params.style != undefined) {
        for (let i = 0; i < 99; i++) {
            if (Object.keys(params.style)[i] == undefined) {
                i = 99;
            };
            blockGameConstructorObject.style[Object.keys(params.style)[i]] = Object.values(params.style)[i];
        };
    };
    this.in = params.in;
    this.object = blockGameConstructorObject;
    this.onclick = function (functionWhenClickThis) {
        this.object.onclick = functionWhenClickThis;
    };
    this.setInnerText = function (value) {
        this.innerText = value;
        this.object.innerHTML = value;
    };
    this.setAtributte = function (attribute, value) {
        this[attribute] = value;
        this.object[attribute] = value;
    };
    this.setStyle = function (style, value) {
        this.style[style] = value;
        this.object.style[style] = value;
    };
    this.addDisplay = function (layout) {
        if (document.getElementById(layout) != undefined) {
            this.display.push(layout);
            document.getElementById(layout).appendChild(this.object);
        } else {
            console.error('Неверный this.add(). Мы не можем создать элемент в несуществующем обьекте');
        };
    };
    this.removeDisplay = function (layout) {
        let l = layout; //short 'layout'
        if (l == this.in) {
            document.getElementById(l).removeChild(this.object);
        } else {
            console.error('Мы не может удалить блок там, где его нет');
        };
    };
    if (params.display != undefined) {
        if (document.getElementById(params.display) != undefined) {
            this.display.push(params.display)
            document.getElementById(params.display).appendChild(blockGameConstructorObject);
        } else {
            console.error('Неверный params.dispay. Мы не можем создать элемент в несуществующем обьекте')
            return;
        };
    };
};

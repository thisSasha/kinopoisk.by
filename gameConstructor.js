export { Layout, TagBlock, pr }

let pr/* print */ = function (...text) {
    console.log(text);
};
let prO/* print one*/ = function (text) {
    console.log(text);
};
let miniWarnig /* warning */ = function (text) {
    console.warn(text);
};
document.body.style.padding = 0;
document.body.style.margin = 0;
let Layouts = [];
let defaultLayout = null;
let tagBlockPlugins = {
    'solid': {
        'setSolid': function (trueOrFalse) {
            if (trueOrFalse == true) {
                this.power = false;
            } else if (trueOrFalse == false) {
                this.power = true;
            } else {
                console.error('incorrectType. Вы указали неверный тип данных. {Разрешены true или false}')
            };
        },
        'power': 'powerIsNot'
    },
};
function importPlugin(plugin, obj) {
    obj['plugins'][plugin] = tagBlockPlugins[plugin];
};
function Layout(params) {
    if (params.name == undefined) {
        console.error('Обязательный параметр name в параметрах данного обьекта');
        return;
    };
    for (let i = 0; i < Layouts.length; i++) {
        const element = Layouts[i];
        if (element.name == params.name) {
            console.error(`Имена обьектов совпадают ${element.object}`)
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
    Layouts.push(this);
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
    document.body.appendChild(layoutGameConstructorObject)
    this.object = layoutGameConstructorObject;
}
function TagBlock(params) {
    let blockGameConstructorObject = document.createElement('div');

    if (params.name == undefined) {
        console.error('Error Обязательный параметр name в параметрах данного обьекта');
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
            this[Object.keys[x]] = value
            this.object[Object.keys[x]] = value
        };
    };
    this.customProperties = params.customProperties;
    if (params.innerText != undefined) {
        this.innerText = params.text;
    };
    if (params.type != undefined) {
        this.tagName = params.type;
        blockGameConstructorObject = document.createElement(params.type);
    };

    this[tagBlockPlugins.solid] = params.solid;

    if (params.plugins != undefined) {
        for (let i = 0; i < params.plugins.length; i++) {
            importPlugin(params.plugins, this)
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
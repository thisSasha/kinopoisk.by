
let get = {
    id: function (id) {
        return (document.getElementById(id))
    },
    class: function (clas) {
        return (document.getElementsByClassName(clas))
    }
}
let getid = function (id) {
    return (document.getElementById(id));
}
let getclass = function (clas) {
    return (document.getElementById(clas));
};

let clear = function cCl() {
    console.clear()
}
let printTest;
let print = function (i) {
    if (printTest == true) {
        console.log(i)
    }
}


let cssToJs = function (el, cssCode) {
    css = cssCode.split('')
    css.forEach(el => {
        if (el == ":" || el == ";" || el == "") {
            let x = css.indexOf(el);
            css.splice(x, 1);
        }
    });
    css = css.join("");
    css = css.split(' ');
    if (css.length == 2 && css[0] != 'transform') {
        css = `${el}.style.${css[0]} = "${css[1]}";`
    } else if (css.length > 2 && css[0] != 'transform') {
        css = `${el}.style.${css[0]} = "${css[1]}";`
        for (let i = 2; i < css.length / 2; i++) {
            css += `\n ${el}.style.${css[i]} = "${css[i + 1]}";`
        }
    } print(css)

}


function commands() {
    let comand = [
        'sim.help()-вывести в консоль помощь\n \
        sim.print(i)-вывести в консоль i \n \
        sim.get.id(i)/sim.getid(i) вывести в переменную обьект с id i, \n \
        sim.get.class(i) вывести в переменную обьект с class i \n \ ',
    ]
    return comand[0]
}
let help = function () {
    let userLang = navigator.language || navigator.userLanguage;
    if (userLang = 'ru') {
        print(' \
        Привет, я тебе помогу разобраться в модуле simple. \n \
        Он упрощает работу.\n \
        Для того чтобы его импортировать желательно\n \
        прописать «import * as sim "./simple"».\n \
        это импорт всего в переменную sim из файла "этаПапка/simple.js"\n \
        \n \
        Команды: \n \
        \n \
        '+ commands())
    }
}
help()
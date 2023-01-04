export function createTable2Lines(text) {
    let lines = [];
    let firstParentheses = text.indexOf('(') + 1;
    let lastParentheses = text.lastIndexOf(')');
    lines.push(text.substring(0, firstParentheses));
    let fields = text.substring(firstParentheses, lastParentheses);
    fields = fields.replaceAll(',', ',&')
    fields.split('&').forEach(e => {
        lines.push(e);
    });
    lines.push(text.substring(lastParentheses));
    return lines;
}

export function BoxHeight() {
    let height = window.innerHeight - 520;
    if (height < 250) {
        height = 250;
    }
    return height;
}

export function BoxWidth() {
    let width = window.innerWidth - 1000;
    if (width < 1450) {
        width = 1400;
    }
    return width;
}
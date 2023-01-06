export const SIZES = {
    minHeight: 720,
    leftBoxWidth: 300,
    getRightBoxWidth: function() {
        let width = window.innerWidth - 40;
        return width - this.leftBoxWidth;
    },
    minWidth: 1280
};

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

export function boxHeight() {
    let innerHeight = window.innerHeight;
    if (innerHeight < SIZES.minHeight) {
        innerHeight = SIZES.minHeight;
    }
    let height = innerHeight - 540;
    return height;
}

export function boxWidth() {
    let width = window.innerWidth - 1000;
    if (width < 1450) {
        width = 1400;
    }
    return width;
}

export const shared = {
    
}

export const rightBoxStyle = function (width) {
    return {
        border: 'solid 0px blue',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: width
    }
}
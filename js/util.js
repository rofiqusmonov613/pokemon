const createDOM = (elem) => document.createElement(elem);
const selectElem = (elem, parent = document) => parent.querySelector(elem, parent)

function normalizeDate(time){
    const date = new Date(time);
    const month = date.getMonth() +1;
    const day = date.getDate();
    const year = date.getFullYear();

    return day + '.' + month + '.' + year
}
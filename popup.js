const range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV');
let selElement = document.getElementById('selElement');
let switcher = document.getElementById('switch');

selElement.addEventListener('change', (e) => {
    setValue({ value: range.value, elements: selElement.value, checked: switcher.checked });
});

switcher.addEventListener('change', (e) => {
    console.log(selElement.value);
    setValue({ value: range.value, elements: selElement.value, checked: switcher.checked });
});

range.addEventListener('change', (e) => {
    setValue({ value: e.target.value, elements: selElement.value, checked: switcher.checked });
});

range.addEventListener('dblclick', (e) => {
    range.value = 20;
    setValue({ value: 20, elements: selElement.value, checked: switcher.checked });
    setValueRange();
});

async function setValue(dict) {
    if (dict.checked == 1 || dict.checked) await browser.storage.local.set({ value: dict.value, elements: dict.elements, checked: 1 });
    else await browser.storage.local.set({ value: dict.value, elements: dict.elements, checked: 0 });
}

async function init() {
    let { value } = await browser.storage.local.get('value');
    let { elements } = await browser.storage.local.get('elements');
    let { checked } = await browser.storage.local.get('checked');

    if (checked == undefined) checked = 1;
    if (!elements) elements = 'p';
    if (!value) value = 20;

    range.value = value;
    selElement.value = elements;
    switcher.checked = checked == 1;

    setValue({ value: value, elements: elements, checked: switcher.checked });
    setValueRange();
}

init().catch((e) => console.error('init error' + e));

const setValueRange = () => {
    const newValue = Number(((range.value - range.min) * 100) / (range.max - range.min)),
        newPosition = 10 - newValue * 0.2;
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
document.addEventListener('DOMContentLoaded', setValueRange);
range.addEventListener('input', setValueRange);

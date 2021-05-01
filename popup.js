const range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV')

    range.addEventListener('change', (e) => {
    setValue(e.target.value);
});

range.addEventListener('dblclick', (e) => {
    range.value = 20;
    setValue(20);
    setValueRange();
});

async function setValue(value) {
    await browser.storage.local.set({ value });
}

async function init() {
    let { value } = await browser.storage.local.get('value');

    if (!value) value = 20;

    range.value = value;
    setValue(value);
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

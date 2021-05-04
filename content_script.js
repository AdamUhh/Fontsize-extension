let style;
style = document.createElement('style');
document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'value' in changes && 'elements' in changes && 'checked' in changes) {
        if (changes.checked.newValue == 1) {
            update(changes.value.newValue, changes.elements.newValue);
        } else {
            style.innerText = '';
        }
    }
});

function update(value, elements) {
    style.innerText = `${elements} { font-size: ${value}px} !important`;
}

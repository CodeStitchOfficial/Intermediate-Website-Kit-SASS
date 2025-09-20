// tertiary nav toggle code
const tertiaryDrop = Array.from(document.querySelectorAll('#cs-navigation .cs-drop3-main'));

for (const item of tertiaryDrop) {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('drop3-active');
    });
}
                                
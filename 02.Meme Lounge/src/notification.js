const box = document.querySelector('#errorBox');

export function notify(msg) { 
    box.innerHTML = `<span>${msg}</span>`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}

window.notify = notify;
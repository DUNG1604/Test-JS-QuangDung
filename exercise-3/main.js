const elementSquare = document.querySelector(".square");

const delay = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

const moveSquare = async () => {
    await delay();
    elementSquare.style.right = 0;
    elementSquare.style.left = 'unset';

    await delay();
    elementSquare.style.bottom = 0;
    elementSquare.style.top = 'unset';

    await delay();
    elementSquare.style.left = 0;
    elementSquare.style.right = 'unset';

    await delay();
    elementSquare.style.top = 0;
    elementSquare.style.bottom = 'unset';
}

moveSquare();
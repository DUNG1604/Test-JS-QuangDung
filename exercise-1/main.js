const elementBtn = document.querySelector("button");
const elementNumber = document.querySelector(".number");
const elementCheck = document.querySelector(".check");

function isPerfectNumber(n) {
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i;
            if (i !== n / i) {
                sum += n / i;
            }
        }
    }
    return sum === n && num !== 1;
}

elementBtn.addEventListener("click", () => {
    const intervalId = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        elementNumber.innerHTML = randomNum;
        if (isPerfectNumber(randomNum)) {
            elementCheck.innerHTML = "Là số hoàn hảo.";
            clearInterval(intervalId);
        } else {
            elementCheck.innerHTML = "Không là số hoàn hảo.";
        }
    }, 2000);
});

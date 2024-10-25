const mang = [10, 5, 2, 5, 6, 7, 8, 9];

const sumNumber = (arr) => {
    return arr.reduce((acc, num) => acc + num, 0)
};

const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

const findPrimes = (arr) => {
    return arr.filter(isPrime)
};

const isDivide3 = (arr) => {
    return arr.filter(num => num % 3 === 0)
};

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 3000));
};

const processArray = async (arr) => {
    await delay();
    const sum = sumNumber(arr);
    console.log("Tổng các chữ số trong mảng là:", sum);

    await delay();
    const primes = findPrimes(arr);
    console.log("Các số nguyên tố trong mảng là:", primes);

    await delay();
    const divide = isDivide3(arr);
    console.log("Các số chia hết cho 3 trong mảng là:", divide);
};

processArray(mang);

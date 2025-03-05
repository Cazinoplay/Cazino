let balance = 1000; // Начальный баланс
let winChance = 50; // Шанс выигрыша в процентах

document.getElementById('lever').addEventListener('click', function () {
    const reels = document.querySelectorAll('.reel');
    const result = document.getElementById('result');
    const betAmount = parseInt(document.getElementById('bet').value);

    // Проверка ставки
    if (isNaN(betAmount) || betAmount < 10 || betAmount > 100) {
        alert('Ставка должна быть от 10 до 100!');
        return;
    }

    if (betAmount > balance) {
        alert('Недостаточно средств!');
        return;
    }

    // Блокировка рычага на время вращения
    this.disabled = true;

    let spins = 0;
    const spinInterval = setInterval(() => {
        reels.forEach(reel => {
            reel.textContent = getRandomSymbolWithChance(winChance);
        });

        spins++;
        if (spins === 10) {
            clearInterval(spinInterval);

            // Определение выигрыша
            const winMultiplier = getWinMultiplier(reels);
            const totalWin = betAmount * winMultiplier;

            setTimeout(() => {
                if (winMultiplier > 1) {
                    result.textContent = `Победа x${winMultiplier}! Вы выиграли: ${totalWin}`;
                    balance += totalWin;
                    document.getElementById('winSound').play();
                } else {
                    result.textContent = 'Попробуйте ещё раз!';
                    balance -= betAmount;
                }

                document.getElementById('balance').textContent = balance;
                this.disabled = false; // Разблокировка рычага
            }, 1000);
        }
    }, 100);
});

// Функция для получения случайного символа
function getRandomSymbolWithChance(chance) {
    const symbols = ['🍒', '🍊', '🍓', '⭐', '💎'];
    const randomNum = Math.random() * 100;
    return randomNum < chance ? symbols[Math.floor(Math.random() * symbols.length)] : symbols[Math.floor(Math.random() * (symbols.length - 1))];
}

// Функция для определения множителя выигрыша
function getWinMultiplier(reels) {
    const symbols = Array.from(reels).map(reel => reel.textContent);
    if (symbols.every(symbol => symbol === symbols[0])) {
        switch (symbols[0]) {
            case '🍒': return 2;
            case '🍊': return 3;
            case '🍓': return 10;
            case '⭐': return 50;
            case '💎': return 500;
            default: return 1;
        }
    }
    return 1;
}

let balance = 1000; // Initial demo balance
let winChance = 100; // Win chance in percentage (50% in this example)


document.getElementById('lever').addEventListener('click', function() {
    let reels = document.querySelectorAll('.reel');
    let result = document.getElementById('result');
    let betAmount = parseInt(document.getElementById('bet').value); // Get the bet amount from an input field with id 'bet'

    // Check if the lever is disabled (game in progress)
    if (document.getElementById('lever').disabled) {
        return; // Exit the function if the lever is disabled
    }

    // Check if the bet amount is valid
    if (betAmount > balance) {
        alert('Недостаточно средств');
        return;
    }
    if (betAmount < 10) {
        alert('Минимальная ставка° - 10!');
        return;
    }
    if (betAmount <= 0) {
        alert('Недостаточно средств');
        return;
    }

    // Disable the lever while spinning
    document.getElementById('lever').disabled = true;

    let animationDuration = 100; // Initial duration for first reel (in milliseconds)
    let spins = 0; // Counter for the number of spins

    let spinInterval = setInterval(function() {
        reels.forEach(reel => {
            let symbol = getRandomSymbolWithChance(winChance); // Get random symbol with win chance
            reel.textContent = symbol;
            reel.style.animation = `spin ${animationDuration}ms linear infinite`; // Set animation duration for each reel
        });

        spins++;

        if (spins === 10) {
            clearInterval(spinInterval); // Stop spinning after 10 spins

            let winMultiplier = getWinMultiplier(reels);
            let totalWin = betAmount * winMultiplier;

            setTimeout(function() {
                if (winMultiplier > 1) {
                    result.textContent = `Победа x${winMultiplier}! Вы выиграли: ${totalWin}`;

                    // Update balance after displaying result
                    balance += totalWin; // Add the total win to the balance
                } else {
                    result.textContent = 'Проигрыш';

                    // Prevent balance from going negative
                    if (balance - betAmount < 0) {
                        balance = 0; // Set balance to 0 if it would go negative
                    } else {
                        balance -= betAmount; // Deduct the bet amount from the balance
                    }
                }

                if (winMultiplier === 500) {
                    // Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёРј Р·РІСѓРєРѕРІРѕР№ СЌС„С„РµРєС‚
                    let audio = new Audio('win_sound.mp3');
                    audio.play();
                }
                if (winMultiplier === 2) {
                    // Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёРј Р·РІСѓРєРѕРІРѕР№ СЌС„С„РµРєС‚
                    let audio = new Audio('win_sound2.mp3');
                    audio.play();
                }
                if (winMultiplier === 3) {
                    // Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёРј Р·РІСѓРєРѕРІРѕР№ СЌС„С„РµРєС‚
                    let audio = new Audio('win_sound2.mp3');
                    audio.play();
                }
                if (winMultiplier === 10) {
                    // Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёРј Р·РІСѓРєРѕРІРѕР№ СЌС„С„РµРєС‚
                    let audio = new Audio('win_sound2.mp3');
                    audio.play();
                }
                if (winMultiplier === 50) {
                    // Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёРј Р·РІСѓРєРѕРІРѕР№ СЌС„С„РµРєС‚
                    let audio = new Audio('win_sound2.mp3');
                    audio.play();
                }

                // Update balance display after showing result
                document.getElementById('balance').textContent = balance;

                // Re-enable the lever after displaying result
                document.getElementById('lever').disabled = false;
            }, 1500); // Delay result display for 1.5 seconds after spinning ends
        }

        animationDuration += 100; // Increase animation duration for next spin
    }, 100); // Spin every 100ms

    // Reset result text
    result.textContent = '';
});

// Function to initialize the balance display
// Функция для инициализации баланса
function initializeBalance() {
    // Загружаем баланс из localStorage
    balance = loadBalanceFromLocalStorage();
    // Обновляем текст баланса на странице
    document.getElementById('balance').textContent = balance;
}


// Call the initializeBalance function when the page loads
initializeBalance();

// Function to get the win multiplier
function getWinMultiplier(reels) {
    let symbols = [];
    reels.forEach(reel => {
        symbols.push(reel.textContent);
    });

    if (symbols.every(symbol => symbol === symbols[0])) {
        // If all symbols are the same, calculate the multiplier
        if (symbols[0] === '🍒') {
            return 2; // x2 multiplier for cherry
        } else if (symbols[0] === '🍊') {
            return 3; // x3 multiplier for lemon
        } else if (symbols[0] === '🍓') {
            return 10; // x500 multiplier for orange
        } else if (symbols[0] === '⭐') {
            return 50; // x1000 multiplier for diamond
        } else if (symbols[0] === '💎') {
            return 500
        }
    }

    return 1; // No win multiplier
}

// Function to get a random symbol with win chance
function getRandomSymbolWithChance(chance) {
    let symbols = ['🍒', '🍊', '🍓', '⭐', '💎']; // Add more symbols as needed
    let randomNum = Math.random() * 100; // Random number between 0 and 100

    if (randomNum < chance) {
        // Return a symbol with win chance
        return symbols[Math.floor(Math.random() * symbols.length)];
    } else {
        // Return a random symbol (no win)
        return symbols[Math.floor(Math.random() * (symbols.length - 1))];
    }
}

// Функция для сохранения баланса в localStorage
function saveBalanceToLocalStorage(balance) {
    localStorage.setItem('balance', balance);
}

// Функция для загрузки баланса из localStorage
function loadBalanceFromLocalStorage() {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseInt(savedBalance) : 1000; // Возвращаем сохраненный баланс, если он есть, иначе 1000
}

// Обработка нажатия кнопок "Купить"
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseInt(button.getAttribute('data-price'));
        const freeSpins = parseInt(button.getAttribute('data-free-spins'));

        if (price === 0 && freeSpins > 0) {
            // Если товар бесплатный и это бесплатные прокрутки
            // Добавляем бесплатные прокрутки
            addFreeSpins(freeSpins);
            alert(`Вы получили ${freeSpins} бесплатных прокруток!`);
        } else {
            // Если это обычный товар, обработка покупки
            if (balance >= price) {
                balance -= price; // Вычитаем цену товара из баланса
                saveBalanceToLocalStorage(balance); // Сохраняем обновленный баланс
                document.getElementById('balance').textContent = balance; // Обновляем отображение баланса на странице
                alert('Покупка прошла успешно!');
            } else {
                alert('Недостаточно средств');
            }
        }
    });
});

document.getElementById('switchToMemoryGame').addEventListener('click', () => {
    window.location.href = 'play.html'; // Замените 'play.html' на путь к вашей странице с игрой "Memory Card Game"
});

// Функция для сохранения баланса в localStorage
function saveBalanceToLocalStorage(balance) {
    localStorage.setItem('balance', balance);
}

// Функция для загрузки баланса из localStorage
function loadBalanceFromLocalStorage() {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseInt(savedBalance) : 1000; // Загружаем сохраненный баланс, если он есть, иначе устанавливаем начальное значение
}

// Функция для инициализации баланса
function initializeBalance() {
    // Загружаем баланс из localStorage
    balance = loadBalanceFromLocalStorage();
    // Обновляем текст баланса на странице
    document.getElementById('balance').textContent = balance;
}

// Вызываем функцию initializeBalance при загрузке страницы
initializeBalance();

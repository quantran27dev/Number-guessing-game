const readline = require('readline');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function gameOn() {
    console.log("Welcome to the Number Guessing Game!");
    await delay(1);
    console.log("I'm thinking of a number between 1 and 100.");
    await delay(1);
    console.log("Can you guess what it is?");
    await delay(1);

    const targetNumber = Math.floor(Math.random() * 50) + 1; // Random number between 1 and 50
    console.log(targetNumber);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    console.log('Difficulty list:');
    console.log('1. Easy (10 chances)');
    console.log('2. Medium (5 chances)');
    console.log('3. Hard (3 chances)');

    let difficulty;
    rl.question('Select difficulty: ', (answer) => {
        difficulty = answer;
        let chances;
        if (difficulty === '1') {
            chances = 10;
            console.log('You have chosen Easy mode. You have 10 chances to guess the number.');
        } else if (difficulty === '2') {
            chances = 5;
            console.log('You have chosen Medium mode. You have 5 chances to guess the number.');
        } else if (difficulty === '3') {
            chances = 3;
            console.log('You have chosen Hard mode. You have 3 chances to guess the number.');
        } else {
            console.log('Invalid choice. Exiting the game.');
            chances = 0;
            rl.close();
        };


        function askGuess() {
            rl.question('Enter your guess: ', (guess) => {
                const userGuess = parseInt(guess);
                if (isNaN(userGuess)) {
                    console.log('Invalid input. Please enter a number.');
                    askGuess(); // Không trừ lượt
                    return;
                };
                if (userGuess === targetNumber) {
                    console.log('Correct');
                    rl.close();
                } else if (userGuess < targetNumber) {
                    console.log('The number is higher than ' + userGuess);
                    chances--;
                    console.log(`You have ${chances} chances left.`);
                } else if (userGuess > targetNumber) {
                    console.log('The number is lower than ' + userGuess);
                    chances--;
                    console.log(`You have ${chances} chances left.`);

                }
                if (chances > 0) {
                    askGuess();
                } else {
                    console.log('Game over! You have no chances left. The number was ' + targetNumber);
                    rl.close();
                }
            });
        }
        askGuess();
    }
    );
}
gameOn();

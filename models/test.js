export class Game {
  static LAST_INDEX = -1;

  constructor(min, max, maxAttempts) {
    this.min = min;
    this.max = max;
    this.maxAttempts = maxAttempts;
    this.answer = this.generateRandomNumber();
    this.attempts = [];
    this.status = 'PLAYING'; // PLAYING, WON, LOST
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (Math.floor(this.max) - Math.ceil(this.min) + 1)) + this.min; 
  }

  validateMinMax(input) {
    const parts = input.split(",")
  
    if (parts.length === 2 && parts.every((part) => part !== "" && Number(part)) && Number(parts[0]) < Number(parts[1])) {
      const min = Number(input.split(",")[0]?.trim())
      const max = Number(input.split(",")[1]?.trim())
  
      return {min, max}
    }
  
    return null
  }

  validateCount(input) {
    if ( input !== "" && Number(input) > 0 && !isNaN(input) ){
      return Number(input)
    }
  
    return null
  }

  makeGuess(guess) {
    const lastGuess = this.attempts.at(Game.LAST_INDEX);

    if (lastGuess < this.answer && guess <= this.max) return "UP"
    if (lastGuess > this.answer && guess <= this.max) return "DOWN"
    if (lastGuess === this.answer && guess <= this.max) return "CORRECT"
  
  }

  validateGuess(guess) {
    if (guess === '' || guess === null || guess === undefined) return null
    
    if (guess < this.min) return null
    
    if (guess > this.max) return null
    
    if (this.attempts.includes(Number(guess))) return null
    
    return Number(guess);
  }

  isGameOver() {
    if (this.attempts.length >= this.maxAttempts && this.status !== "WON") {
      this.status = "LOST";
      return true;
    }
    return this.status === "WON";
  }
}

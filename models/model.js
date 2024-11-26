export class GameModel {
  constructor(min,max,maxAttempts) {
    this.min = min
    this.max = max
    this.maxAttempts = maxAttempts;
    this.answer = this.generateRandomNumber();
    this.attempts = [];
    this.status = 'PLAYING'; // PLAYING, WON, LOST
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (Math.floor(this.max) - Math.ceil(this.min) + 1)) + this.min; 
  }

  static validateMinMax(input) {
    const parts = input.split(",")
  
    if (parts.length === 2 && parts.every((part) => part !== "" && Number(part)) && Number(parts[0]) < Number(parts[1])) {
      const min = Number(input.split(",")[0]?.trim())
      const max = Number(input.split(",")[1]?.trim())
  
      return {min, max}
    }
  
    return null
  }

  static validateAttempt (input) {
    if (input !== "" && Number(input) > 0 && !isNaN(input) ){

    return Number(input)
    }
  
    return null
  }

  validateInput(input) {
    if (input === '' || input === null || input === undefined) return null
    
    if (input < this.min) return null
    
    if (input > this.max) return null
    
    if (this.attempts.includes(Number(input))) return null
    
    return Number(input);
}

  makeGuess(input) {
    const lastGuess = this.attempts.at(-1);
    if (this.maxAttempts < this.attempts.length) return "EXCEEDED"
    if (lastGuess < this.answer && input <= this.max) return "UP"
    if (lastGuess > this.answer && input <= this.max) return "DOWN"
    if (lastGuess === this.answer && input <= this.max) return "CORRECT"
  }
}


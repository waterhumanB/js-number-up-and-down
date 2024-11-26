export class GameModel {

  static LAST_IDX = 1

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

  validateMinMax(input) {
    const parts = input.split(",")
  
    if (parts.length === 2 && parts.every((part) => part !== "" && Number(part)) && Number(parts[0]) < Number(parts[1])) {
      const min = Number(input.split(",")[0]?.trim())
      const max = Number(input.split(",")[1]?.trim())
  
      return {min, max}
    }
  
    return null
  }

  validateAttempt () {
    if ( this.maxAttempts !== "" && Number(this.maxAttempts) > 0 && !isNaN(this.maxAttempts) ){

    return Number(this.maxAttempts)
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

  evaluateGuess(input) {
    const lastGuess = this.attempts.at(GameModel.LAST_IDX);
  
    if (lastGuess < this.answer && input <= this.max) return "UP"
    if (lastGuess > this.answer && input <= this.max) return "DOWN"
    if (lastGuess === this.answer && input <= this.max) return "CORRECT"
  }
}


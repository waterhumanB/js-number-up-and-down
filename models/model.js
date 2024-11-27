import { ERROR } from "../constants/constants.js"

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
    const parts = input?.split(",");

      if (parts.length !== 2) return ERROR;

      const min = Number(parts[0].trim());
      const max = Number(parts[1].trim());

      if (isNaN(min) || isNaN(max)) return ERROR;

      if (min >= max) return ERROR;

    return { min, max };
  }

  static validateAttempt (input) {
      if (input !== "" && Number(input) > 0 && !isNaN(input) ){

      return Number(input)
    }
  
    return ERROR
  }

  validateInput(input) {
      if (input === '' || input === null || input === undefined) return ERROR
    
      if (input < this.min) return ERROR

      if (input > this.max) return ERROR
    
      if (this.attempts.includes(Number(input))) return ERROR
    
    return Number(input);
  }

  makeGuess(input) {
    const lastGuess = this.attempts.at(-1);
    
    if (this.maxAttempts <= this.attempts.length) return "EXCEEDED"

    if (lastGuess < this.answer && input <= this.max) return "UP"

    if (lastGuess > this.answer && input <= this.max) return "DOWN"

    if (lastGuess === this.answer && input <= this.max) return "CORRECT"
  }
}


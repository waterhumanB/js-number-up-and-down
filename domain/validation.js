export function validateMinMax(input) {
const parts = input.split(",")

  if (parts.length === 2 && parts.every((part) => part !== "" && Number(part)) && Number(parts[0]) < Number(parts[1])) {
    const min = Number(input.split(",")[0]?.trim())
    const max = Number(input.split(",")[1]?.trim())

    return {min, max}
  }

  return null
}

export function validateCount(input) {
  if ( input !== "" && Number(input) > 0 && !isNaN(input) ){
    return Number(input)
  }

  return null
}

export function validateInput(input,randomNum,answer, max) {
  if (
    input > 0 &&
    input <= max &&
    !answer.includes(Number(input)) && 
    input !== "" && 
    input !== null && 
    input !== undefined
  ) {
    return Number(input)
  }
  return null
}
export class GameView {

  displayError (message) {
    return window.alert(message)
  }

  getInputValue (inputId) {
    return document.getElementById(inputId).value
  }

  clearInput(inputId) {
    return document.getElementById(inputId).value = ""
  }

  displayNone (elId, none) {
    const element = document.getElementById(elId)

    if (none === true) {
      return element.style.display = "none"
    }

    if (none === false) {
      return element.style.display = "flex"
    }
  }

  createElement(containerId, tagName, textContent) {
    const container = document.getElementById(containerId)
    const newElement = document.createElement(tagName)
    newElement.textContent = textContent
    container.appendChild(newElement)
  }

  clearDynamicElements(containerId) {
    const container = document.getElementById(containerId)

    while(container.firstChild){
      container.removeChild(container.firstChild)
    }
  }

  clickButton(btnId, callback) {
    const button = document.getElementById(btnId)
    const newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button)
    newButton.addEventListener('click', callback)
  }
  
  displayResult(result, attempts, answer) {
    switch (result) {
      case 'UP':
        return `업!! 이전 추측: ${attempts.join(', ')}`
      case 'DOWN':
        return `다운!! 이전 추측: ${attempts.join(', ')}`
      case 'CORRECT':
        return `정답!!! 축하합니다!!!! ${attempts.length}번 만에 맞추셨습니다.`
      case 'EXCEEDED':
        return `${attempts.length}회 초과! 숫자를 맞추지 못했습니다! (정답: ${answer})`
    }
  }
}


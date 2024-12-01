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

  displayMsg (elId, msg) {
    return document.getElementById(elId).ELEMENT_NODE.innerText = msg
  }

  createElement(containerId, tagName, textContent) {
    const container = document.getElementById(containerId)
    const newElement = document.createElement(tagName)
    newElement.textContent = textContent
  
    return container.appendChild(newElement)
  }

  clickButton(btnId, callback) {
    const button = document.getElementById(btnId)

    button.addEventListener("click", () => {
      callback(); // 동적으로 전달된 로직 실행
    });
  }
  
  displayResult(result, attempts, answer) {
    switch (result) {
      case 'UP':
        return `업 \n 이전 추측: ${attempts.join(', ')}`
      case 'DOWN':
        return `다운 \n 이전 추측: ${attempts.join(', ')}`
      case 'CORRECT':
        return `정답!\n축하합니다! ${attempts.length}번 만에 맞추셨습니다.`
      case 'EXCEEDED':
        return `${attempts.length}회 초과! 숫자를 맞추지 못했습니다! (정답: ${answer})`
    }
  }
}


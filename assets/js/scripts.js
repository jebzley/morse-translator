import {
  translationKey,
  translateEnglishToMorse,
  translateMorseToEnglish,
  formatOutput,
} from "./translator.js";

const inputArea = document.getElementById("input-area");
const outputArea = document.getElementById("output-area");
const audioButton = document.getElementById("audio-button");

inputArea.addEventListener("keyup", (event) => {
  let textToTranslate = event.target.value;
  if (/^[.\/ -]*$/gm.test(textToTranslate)) {
    outputArea.innerText = translateMorseToEnglish(
      textToTranslate,
      translationKey
    );
  } else {
    outputArea.innerHTML = formatOutput(
      translateEnglishToMorse(textToTranslate, translationKey)
    );
  }
});

audioButton.addEventListener("click", () => {
  if (/^[.\/ -]*$/gm.test(outputArea.innerText)) {
    const soundsToPlay = outputArea.innerText.split("");
    let index = 0;
    setInterval(() => {
      if (soundsToPlay[index] === ".") {
        new Audio("./assets/audio/dit.wav").play();
      }

      if (soundsToPlay[index] === "-") {
        new Audio("./assets/audio/dah.wav").play();
      }
      index++;
    }, 200);
  } else {
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(outputArea.innerText)
    );
  }
});

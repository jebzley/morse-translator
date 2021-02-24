import {
  translationKey,
  translateEnglishToMorse,
  translateMorseToEnglish,
  formatOutput
} from "./translator.js";

const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');

inputArea.addEventListener('keyup', event => {
  let textToTranslate = event.target.value;
  if((/^[.\/ -]*$/gm).test(textToTranslate)){
    outputArea.innerText = translateMorseToEnglish(textToTranslate, translationKey);
  } else{
    outputArea.innerHTML = formatOutput(translateEnglishToMorse(textToTranslate, translationKey));
  }
    
})
    



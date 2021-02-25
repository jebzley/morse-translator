/*class Translator
class Translator {
  constructor(inputText) {
    this.inputText = inputText;
    this.translationKey = {
      a: ".-",
      b: "-...",
      c: "-.-.",
      d: "-..",
      e: ".",
      f: "..-.",
      g: "--.",
      h: "....",
      i: "..",
      j: ".---",
      k: "-.-",
      l: ".-..",
      m: "--",
      n: "-.",
      o: "---",
      p: ".--.",
      q: "--.-",
      r: ".-.",
      s: "...",
      t: "-",
      u: "..-",
      v: "...-",
      w: ".--",
      x: "-..-",
      y: "-.--",
      z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
      ".": ".-.-.-",
      ",": "--..--",
      "?": "..--..",
      "'": ".----.",
      "!": "-.-.--",
      "/": "-..-.",
      "(": "-.--.",
      ")": "-.--.-",
      "&": ".-...",
      ":": "---...",
      ";": "-.-.-.",
      "=": "-...-",
      "+": ".-.-.",
      "-": "-....-",
      _: "..--.-",
      '"': ".-..-.",
      $: "...-..-",
      "@": ".--.-.",
      " ": "/",
    };
  }
} */

export const translationKey = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
  "\n": "/",
};

export const parseEnglish = (input, translationKey) => {
  let output = [];
  const lowerCaseInput = String(input).toLowerCase();
  lowerCaseInput.split("").forEach((char) => {
    if (Object.keys(translationKey).indexOf(char) != -1) {
      output.push(char);
    }
  });
  return output.join("");
};

export const parseMorse = (input, translationKey) => {
  let output = [];
  input.split(" ").forEach((symbol) => {
    if (Object.values(translationKey).indexOf(symbol) != -1) {
      output.push(symbol);
    }
  });
  return output.join(" ");
};

export const translateMorseToEnglish = (input, translationKey) => {
  const processedInput = parseMorse(input, translationKey);
  const englishOutput = processedInput.split(" ").map((symbol) => {
    return Object.keys(translationKey).find(
      (letter) => translationKey[letter] === symbol
    );
  });
  return englishOutput.join("");
};

export const translateEnglishToMorse = (input, translationKey) => {
  const processedInput = parseEnglish(input, translationKey);
  const morseOutput = processedInput.split("").map((char) => {
    return translationKey[char];
  });
  return morseOutput.join(" ");
};

export const formatOutput = (stringForScreen) => {
  return stringForScreen
    .split("")
    .map((digit) => {
      if (digit == ".") return (digit = '<span class="display__dot">.</span>');
      else if (digit == "/")
        return (digit = '<span class="display__slash">/</span>');
      else return digit;
    })
    .join("");
};

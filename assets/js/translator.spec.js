import {
  translationKey,
  parseEnglish,
  parseMorse,
  translateEnglishToMorse,
  translateMorseToEnglish,
} from "./translator.js";

describe("English parsing", () => {
  it("Should return an empty string when given one", () => {
    const result = parseEnglish("", translationKey);
    expect(result).toBe("");
  });
  it("should return a string", () => {
    const result = parseEnglish(1234, translationKey);
    expect(result).toBe("1234");
  });
  it("should be lowercase", () => {
    const result = parseEnglish("ABCD", translationKey);
    expect(result).toBe("abcd");
  });
  it("should support special chars", () => {
    const result = parseEnglish(
      "What's my motherfucking name, serial killah?",
      translationKey
    );
    expect(result).toBe("what's my motherfucking name, serial killah?");
  });
  it("should support spaces", () => {
    const result = parseEnglish("A B C D", translationKey);
    expect(result).toBe("a b c d");
  });
  it("should discard unsupported characters", () => {
    const result = parseEnglish("A}B|C*D", translationKey);
    expect(result).toBe("abcd");
  });
});

describe("Morse parsing", () => {
  it("Should return an empty string when given one", () => {
    const result = parseMorse("", translationKey);
    expect(result).toBe("");
  });
  it("Should return correct strings exactly", () => {
    const result = parseMorse("... .- ..- ... .- --. .", translationKey);
    expect(result).toBe("... .- ..- ... .- --. .");
  });
  it("Should handle spaces", () => {
    const result = parseMorse(
      "-.-. ..- -- -... . .-. .-.. .- -. -.. / ... .- ..- ... .- --. .",
      translationKey
    );
    expect(result).toBe(
      "-.-. ..- -- -... . .-. .-.. .- -. -.. / ... .- ..- ... .- --. ."
    );
  });
  it("Should remove unsupported characters", () => {
    const result = parseMorse(
      "-.-. r ..- ?? -- -... e . .-. .-.. ^ .- -. -.. / ... .- ..- ... .- --. .",
      translationKey
    );
    expect(result).toBe(
      "-.-. ..- -- -... . .-. .-.. .- -. -.. / ... .- ..- ... .- --. ."
    );
  });
  it("Should return an empty string if only given unsupported chars", () => {
    const result = parseMorse("48 dogs !", translationKey);
    expect(result).toBe("");
  });
  it("Should remove incorrect morse", () => {
    const result = parseMorse(
      "........... -.-.-.-.-.-.-.-. ---------------------",
      translationKey
    );
    expect(result).toBe("");
  });
  it("Should support special chars", () => {
    const result = parseMorse(
      "-.--. .. - / .- .. -. .----. - / .- / - .... .. -. --. -.--.- / -... ..- - / .- / -.-. .... .. -.-. -.- . -. / .-- .- -. --. -.-.--",
      translationKey
    );
    expect(result).toBe(
      "-.--. .. - / .- .. -. .----. - / .- / - .... .. -. --. -.--.- / -... ..- - / .- / -.-. .... .. -.-. -.- . -. / .-- .- -. --. -.-.--"
    );
  });
});

describe("English to Morse", () => {
  it("Should return an empty string when given one", () => {
    const result = translateEnglishToMorse("", translationKey);
    expect(result).toBe("");
  });

  it("Should translate", () => {
    const result = translateEnglishToMorse("a", translationKey);
    expect(result).toBe(".-");
  });

  it("Should translate the alphabet", () => {
    const result = translateEnglishToMorse(
      "abcdefghijklmnopqrstuvwxyz",
      translationKey
    );
    expect(result).toBe(
      ".- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.."
    );
  });

  it("Should translate special characters", () => {
    const result = translateEnglishToMorse(
      `.,?'!/()&:;=+-_"&:;=+-_"$@`,
      translationKey
    );
    expect(result).toBe(
      ".-.-.- --..-- ..--.. .----. -.-.-- -..-. -.--. -.--.- .-... ---... -.-.-. -...- .-.-. -....- ..--.- .-..-. .-... ---... -.-.-. -...- .-.-. -....- ..--.- .-..-. ...-..- .--.-."
    );
  });

  it("Should handle spaces", () => {
    const result = translateEnglishToMorse("red balloons", translationKey);
    expect(result).toBe(".-. . -.. / -... .- .-.. .-.. --- --- -. ...");
  });

  it("Should handle numbers, letters and spaces", () => {
    const result = translateEnglishToMorse("99 red balloons", translationKey);
    expect(result).toBe(
      "----. ----. / .-. . -.. / -... .- .-.. .-.. --- --- -. ..."
    );
  });
  it("Should treat uppercase and lowercase the same", () => {
    const result = translateEnglishToMorse("99 ReD BaLlOoNs", translationKey);
    expect(result).toBe(
      "----. ----. / .-. . -.. / -... .- .-.. .-.. --- --- -. ..."
    );
  });
  it("Should handle assortment of characters", () => {
    const result = translateEnglishToMorse(
      "99? (ReD) $$$BaLlOoNs!",
      translationKey
    );
    expect(result).toBe(
      "----. ----. ..--.. / -.--. .-. . -.. -.--.- / ...-..- ...-..- ...-..- -... .- .-.. .-.. --- --- -. ... -.-.--"
    );
  });
  it("Should turn newline into space", () => {
    const result = translateEnglishToMorse("99\nred\nballoons", translationKey);
    expect(result).toBe(
      "----. ----. / .-. . -.. / -... .- .-.. .-.. --- --- -. ..."
    );
  });
  it("Should ignore unsupported characters", () => {
    const result = translateEnglishToMorse("*^#|", translationKey);
    expect(result).toBe("");
  });
});

describe("Translating morse to English", () => {
  it("Should return an empty string when given one", () => {
    const result = translateMorseToEnglish("", translationKey);
    expect(result).toBe("");
  });
  it("Should translate the alphabet", () => {
    const result = translateMorseToEnglish(
      ".- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..",
      translationKey
    );
    expect(result).toBe("abcdefghijklmnopqrstuvwxyz");
  });
  it("Should translate numbers", () => {
    const result = translateMorseToEnglish(
      ".---- ..--- ...-- ....- ..... -.... --... ---.. ----. -----",
      translationKey
    );
    expect(result).toBe("1234567890");
  });
  it("Should translate special characters", () => {
    const result = translateMorseToEnglish(
      ".-.-.- --..-- ..--.. .----. -.-.-- -..-. -.--. -.--.- .-... ---... -.-.-. -...- .-.-. -....- ..--.- .-..-. ...-..- .--.-.",
      translationKey
    );
    expect(result).toBe(`.,?'!/()&:;=+-_"$@`);
  });
  it("Should handle spaces", () => {
    const result = translateMorseToEnglish(
      ".-- --- .-. -.. / -.-- . ... / .-.. --- - ... / --- ..-. / .-- --- .-. -.. ...",
      translationKey
    );
    expect(result).toBe(`word yes lots of words`);
  });
  it("Should remove unsupported chars", () => {
    const result = translateMorseToEnglish(
      ".-- £ --- .-. -.. / -.-- . ... / .-.. --- - ... / --- ^ ..-. / .-- --- .-. -.. ...",
      translationKey
    );
    expect(result).toBe(`word yes lots of words`);
  });
  it("Should translate proper sentences", () => {
    const result = translateMorseToEnglish(
      ".. / ... - .- .-. - . -.. / - .... .. ... / --. .- -. --. ... - .- / ... .... .. - .-.-.- / .. ... / - .... .. ... / - .... . / -- --- - .... . .-. ..-. ..- -.-. -.- .. -. --. / - .... .- -. -.- ... / .. / --. . - ..--.. / -.--. .... . .-.. .-.. --- -.-.-- -.--.-",
      translationKey
    );
    expect(result).toBe(
      "i started this gangsta shit. is this the motherfucking thanks i get? (hello!)"
    );
  });
});

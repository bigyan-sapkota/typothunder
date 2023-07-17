const initialLetter: Letter = {
  completed: false,
  correct: false,
  letter: "",
  typed: "",
};

export const removeContinuousSpaces = (sentence: string): string => {
  if (sentence === " ") return "";
  let newSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " " && sentence[i + 1] === " ") continue;
    newSentence = newSentence.concat(sentence[i]);
  }
  return newSentence;
};

const calculateForEachWord = (
  originalWord: string,
  typedWord: string
): Sentence => {
  const sentence: Sentence = [];
  for (let i = 0; i < originalWord.length || i < typedWord.length; i++) {
    const completed: boolean = !!typedWord[i];
    const correct = typedWord[i] === originalWord[i];
    const letter = originalWord[i] || typedWord[i];
    const typed = typedWord[i];
    sentence.push({ completed, correct, letter, typed });
  }
  return sentence;
};

export const getCurrentSentence = (
  originalSentence: string,
  typedSentence: string
): Sentence => {
  const sentence: Sentence = [];

  const originalWord = originalSentence.split(" ");
  const typedWord = typedSentence.split(" ");

  for (let i = 0; i < originalWord.length || i < typedWord.length; i++) {
    if (i !== 0)
      sentence.push({
        completed: true,
        correct: true,
        letter: " ",
        typed: " ",
      });
    sentence.push(
      ...calculateForEachWord(originalWord[i] || "", typedWord[i] || "")
    );
  }

  return sentence;
};

export const deleteLetter = (sentence: string): string => {
  return sentence.slice(0, -1);
};

export const deleteWord = (sentence: string): string => {
  return sentence.split(" ").slice(0, -1).join(" ").concat(" ");
};

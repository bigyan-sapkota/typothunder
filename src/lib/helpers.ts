export const getSentenceString = (sentence: Sentence): string => {
  let sentenceString = "";
  sentence.map((letter) => {
    sentenceString += letter.letter;
  });
  return sentenceString;
};

export const getCurrentWord = (
  sentence: Sentence,
  wordIndex: number
): string => {
  const sentenceString = getSentenceString(sentence);
  const wordsLength = sentenceString.split(" ").length;
  let word: string = sentenceString.split(" ")[wordIndex];
  if (wordIndex < wordsLength - 1) word += " ";
  return word;
};

export const getCompletedWordsIndex = (
  sentence: Sentence,
  wordIndex: number
): number => {
  let completedWordsIndex = 0;
  const sentenceString = getSentenceString(sentence);
  for (let i = 0; i < sentenceString.length && wordIndex !== 0; i++) {
    if (sentenceString[i] === " ") wordIndex--;
    completedWordsIndex++;
  }
  return completedWordsIndex;
};

export const removeContiguousSpaces = (arg: string): string => {
  if (arg === " ") return "";
  arg = arg.trim();
  let newString = "";
  for (let i = 0; i < arg.length; i++) {
    if (arg[i] === " " && arg[i + 1] === " ") continue;
    newString += arg[i];
  }
  return newString;
};

export const calculateSentence = ({
  word,
  sentence,
  wordIndex,
}: {
  word: string;
  sentence: Sentence;
  wordIndex: number;
}): Sentence => {
  const sentenceString = getSentenceString(sentence);
  let index = 0;
  for (let i = 0; i < sentenceString.length && i < wordIndex; i++) {
    if (sentenceString[i] === " " || i === sentenceString.length) index++;
  }

  const completedWordsIndex = getCompletedWordsIndex(sentence, wordIndex);
  const completedSentence = sentence.slice(0, completedWordsIndex);
  const unCompletedSentence = sentence.slice(completedWordsIndex);

  for (let i = 0; i < unCompletedSentence.length; i++) {
    unCompletedSentence[i] = {
      letter: unCompletedSentence[i].letter,
      typed: word[i] || "",
    };
  }

  return [...completedSentence, ...unCompletedSentence];
};

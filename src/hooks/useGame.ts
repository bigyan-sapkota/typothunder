const sentenceFromApi =
  "For writers, a random words can help them get their creative juices flowing. Since the topic of the game words is completely unknown, it forces the writer to be creative when the game words appears. There are a number of different ways a writer can use the random game words for creativity. The most common way to use the game words is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what game words will appear from the tool.";
import {
  calculateSentence,
  getCompletedWordsIndex,
  getCurrentWord,
  getSentenceString,
  removeContiguousSpaces,
} from "@/lib/helpers";
import { create } from "zustand";

interface TypingStore {
  sentence: Sentence;
  wordIndex: number;
  letterIndex: number;

  playing: boolean;
  speed: number;
  startedAt: number;
  endedAt: number;
  isFinished: boolean;

  play: () => void;
  setSentence: (arg: string) => void;
  handleInput: (arg: {
    sentence: Sentence;
    wordIndex: number;
    word: string;
    letterIndex: number;
  }) => boolean;
}

export const useTyping = create<TypingStore>((set) => {
  return {
    wordIndex: 0,
    letterIndex: 0,
    sentence: [],
    isFinished: false,
    speed: 0,
    endedAt: 0,
    startedAt: 0,
    playing: false,

    setSentence(arg) {
      arg = removeContiguousSpaces(arg);
      const sentenceString = arg;
      const sentence = arg.split("").map((letter) => ({ letter, typed: "" }));

      set({ sentence, wordIndex: 0, letterIndex: 0 });
    },

    play() {
      set({
        speed: 0,
        endedAt: 0,
        startedAt: Date.now(),
        isFinished: false,
        playing: true,
      });
    },

    handleInput({ sentence, word, wordIndex, letterIndex }) {
      // if (letterIndex === 0 && word === "") return false;
      let isFinished = false;
      const currentWord = getCurrentWord(sentence, wordIndex);

      if (currentWord === "") {
        return false;
      }

      const newSentence = calculateSentence({ word, sentence, wordIndex });
      if (currentWord === word) {
        wordIndex++;
        word = "";
      }

      letterIndex = getCompletedWordsIndex(sentence, wordIndex) + word.length;

      const sentenceString = getSentenceString(sentence);
      isFinished = sentenceString.split(" ").length === wordIndex;
      set({ sentence: newSentence, isFinished, letterIndex, wordIndex });

      return isFinished;
    },
  };
});

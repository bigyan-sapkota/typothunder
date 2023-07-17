"use client";
import React, { useEffect, useRef, useState } from "react";
import { Roboto_Mono } from "next/font/google";
import {
  deleteLetter,
  deleteWord,
  getCurrentSentence,
  removeContinuousSpaces,
} from "@/lib/typingHelpers";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sentenceFromApi =
  "For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.";

export default function Race() {
  const typeRefElement = useRef<null | HTMLDivElement>(null);
  const [sentence, setSentence] = useState<string>(sentenceFromApi);
  const [typedSentence, setTypedSentence] = useState<string>("");
  const [currentSentence, setCurrentSentence] = useState<Sentence>(
    getCurrentSentence(sentence, typedSentence)
  );

  useEffect(() => {
    const method = function (e: KeyboardEvent) {
      setTypedSentence((sentence) => {
        if (e.ctrlKey && e.key === "Backspace") {
          sentence = deleteWord(sentence);
        } else if (e.key === "Backspace") {
          sentence = deleteLetter(sentence);
        } else if (
          e.key.length === 1 &&
          e.key.match(/[a-z0-9,. ()`\+\-!@#$%^&*]/i)
        ) {
          sentence = sentence.concat(e.key);
        }
        return removeContinuousSpaces(sentence);
      });
    };

    typeRefElement.current?.addEventListener("keydown", method);
    typeRefElement.current?.focus();

    return () => {
      typeRefElement.current?.removeEventListener("keydown", method);
    };
  }, []);

  useEffect(() => {
    setCurrentSentence(getCurrentSentence(sentence, typedSentence));
    console.log(typedSentence);
  }, [typedSentence, setCurrentSentence, sentence]);

  return (
    <div className="bg-neutral-800 text-white">
      <div className="w-full max-w-screen-lg mx-auto pt-56 min-h-screen  ">
        <div className={`text-neutral-500 ${roboto_mono.className}`}></div>

        <div
          ref={typeRefElement}
          tabIndex={0}
          className={`flex w-full group outline-none flex-wrap text-xl ${roboto_mono.className}`}
        >
          <div>
            {currentSentence.map((letter, i) => (
              <span
                key={`letter${i}`}
                className={`
                relative 
              ${
                letter.completed
                  ? letter.correct
                    ? "text-amber-400"
                    : "text-rose-500"
                  : "text-neutral-400"
              }
              `}
              >
                {letter.letter}
                <span
                  className={`absolute h-full top-0 -left-0.5 w-0.5 bg-amber-400 
                  ${
                    i === typedSentence.length
                      ? "animate-bar hidden group-focus-within:block"
                      : "hidden"
                  }
                `}
                ></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

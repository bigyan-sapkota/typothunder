"use client";
import React, { useEffect, useRef, useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { useTyping } from "@/hooks/useGame";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sentenceFromApi = "A Quick brown fox jumps over the lazy dog.";

export default function TypingArea() {
  const [input, setInput] = useState("");
  const setSentence = useTyping((state) => state.setSentence);
  const wordIndex = useTyping((state) => state.wordIndex);
  const letterIndex = useTyping((state) => state.letterIndex);
  const sentence = useTyping((state) => state.sentence);
  const isFinished = useTyping((state) => state.isFinished);
  const handleInput = useTyping((state) => state.handleInput);

  useEffect(() => {
    setSentence(sentenceFromApi);
  }, []);

  useEffect(() => {
    setInput(() => "");
  }, [wordIndex]);

  useEffect(() => {
    if (!isFinished) {
      const gameFinished = handleInput({
        letterIndex,
        word: input,
        wordIndex,
        sentence,
      });
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  return (
    <div className="bg-neutral-800 text-white">
      <div className="w-full max-w-screen-lg mx-auto pt-10 min-h-screen  ">
        <div className="py-3">
          <p>wordIndex: {wordIndex}</p>
          <p>letterIndex: {letterIndex}</p>
          <p>isFinished: {isFinished ? "true" : "false"}</p>
          <p>totalLetters: {sentence.length}</p>
        </div>

        <div
          className={`flex flex-wrap leading-9 text-xl ${roboto_mono.className}`}
        >
          {sentence.map((letter, i) => {
            return (
              <span
                key={`letter${i}`}
                className={`
                border-l
                ${letter.letter === " " ? "px-0.5" : ""}
                ${
                  letter.letter !== letter.typed
                    ? i < letterIndex
                      ? "text-rose-400"
                      : "text-neutral-400"
                    : "text-amber-400"
                }
                ${
                  letterIndex === i ? "border-amber-400 " : "border-transparent"
                }
                `}
              >
                {letter.letter}
              </span>
            );
          })}
        </div>

        {!isFinished && (
          <input
            type="text"
            name=""
            className="text-black w-full"
            value={input}
            onChange={handleInputChange}
            id=""
          />
        )}
      </div>
    </div>
  );
}

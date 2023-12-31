"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { Bars } from "react-loader-spinner";
import Tesseract from "tesseract.js";
import AiAvatar from "./ai-avatar";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    role: "user",
    image: null,
  });
  const [recognizedText, setRecognizedText] = useState<IRecognizedtext>({
    role: "system",
    output: null,
  });
  const [isloading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const image = event.target.files[0];
      setSelectedImage({
        ...selectedImage,
        image: URL.createObjectURL(image),
      });
    }
  };

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setIsLoading(true);
        const { data } = await Tesseract.recognize(
          selectedImage.image as string
        );
        setRecognizedText({
          role: "system",
          output: data.text as string,
        });

        setIsLoading(false);
      }
    };
    if (selectedImage.image) {
      recognizeText();
    }
  }, [selectedImage.image]);

  // Adding a temprory array as a database
  const chat: any[] = [];

  // adding data to database to be displayed in chatbot
  if (selectedImage.image) {
    chat.push(selectedImage);
  }
  if (recognizedText.output) {
    chat.push(recognizedText);
  }

  return (
    <main className=" border-2 border-solid border-gray-300 rounded-lg grid mx-auto w-[100%] h-[90vh]  px-8">
      <p className="font-[700] text-[34px] text-[#afafaf] flex items-center justify-center my-3">
        Vision Chatbot
      </p>
      <div className="grid items-center space-x-2 p-4  ">
        <section className="mb-auto pb-[20px] pr-4 max-h-[850px] h-[600px] overflow-y-auto custom-scrollbar ">
          {chat.map((m: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }  my-4 max-w-[1650px] mx-[20px]`}
              >
                {m.role === "assistant" || m.role === "system" ? (
                  <span className="mr-3">
                    <AiAvatar />
                  </span>
                ) : null}
                <div
                  className={`py-2 px-2 text-left rounded-lg ${
                    m.role === "user"
                      ? "bg-blue-600 text-white max-w-[780px]"
                      : "bg-white text-black max-w-[880px]"
                  } `}
                >
                  {m.role === "user" ? (
                    <Image
                      src={m.image as string}
                      alt={"Image"}
                      height={480}
                      width={920}
                      className="rounded-lg"
                    />
                  ) : (
                    <p>{m.output}</p>
                  )}
                  <p></p>
                </div>
              </div>
            );
          })}
        </section>

        <label
          // className="flex justify-center items-center p-2 rounded-full bg-gray-200 text-gray-500 w-10 h-10 cursor-pointer"
          className="flex justify-center items-center p-2 rounded-full bg-blue-600 text-white "
        >
          {isloading ? (
            <span className="flex gap-x-2">
              {"Processing image"}
              <Bars height={20} width={20} color="#FFFFFF" />
            </span>
          ) : (
            <span className="flex  gap-x-2">
              {"Upload "} <LuPaperclip className="h-5 w-5 mt-[3px]" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={isloading}
              />
            </span>
          )}
        </label>
      </div>
    </main>
  );
};
export default ImageUploader;

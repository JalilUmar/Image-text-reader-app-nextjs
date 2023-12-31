"use client";
import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export default function TextRecognition({ selectedImage }: any) {
  const [recognizedText, setRecognizedText] = useState("");
  useEffect(() => {
    const recognizedText = async () => {
      if (selectedImage) {
        const { data } = await Tesseract.recognize(selectedImage);
        setRecognizedText(data.text);
      }
    };
    recognizedText();
  }, [selectedImage]);
  return <div>TextRecognition</div>;
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import Quiz from "./Quiz";

const App = () => {
  return (
    <Routes>
      <Route path="/test/:testId" element={<Quiz />} />
      <Route path="/" element={<CreateQuiz />} />
    </Routes>
  );
};

export default App;

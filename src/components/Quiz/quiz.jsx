import React, { Fragment, useEffect } from "react";
import Question from "./question";

const Quiz = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState([]);

  return (
    <div className="flex flex-col w-full max-h-[calc(100vh-25px)] overflow-auto bg-white text-2xl text-light">
      {data.map((question, index) => {
        return <Question question={question} order={index + 1} key={index} />;
      })}
    </div>
  );
};
export default Quiz;

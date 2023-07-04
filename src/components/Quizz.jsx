import React, { Fragment } from "react";
import Choice from "./Choice";
import Question from "./Question";
import Quiz from "./Quiz/quiz";
const Quizz = ({ questions }) => {
  return (
    <Fragment>
      {questions && (
        <div className="gap-2 flex-col flex  pl-4">
          {questions.choices && <Quiz data={questions.choices} />}
          {questions?.choices.map(({ options, question, answer }, index) => {
            // return (
            //   <div className="p-2">
            //     <Question title={question} index={index} />
            //     {options.map((option, key) => {
            //       return (
            //         <Choice unique_key={`q_${index}_${key}`} content={option} />
            //       );
            //     })}
            //   </div>
            // );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Quizz;

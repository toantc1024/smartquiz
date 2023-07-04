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
        </div>
      )}
    </Fragment>
  );
};

export default Quizz;

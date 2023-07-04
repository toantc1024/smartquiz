import React, { useEffect } from "react";

const Answer = ({ question, order }) => {
  const [answerIndex, setAnswerIndex] = React.useState(null);
  const [textQuestion, setTextQuestion] = React.useState("");
  const [answerEdit, setAnswerEdit] = React.useState(false);

  useEffect(() => {
    let newIndex = null;
    if (typeof question.answer === "string") {
      if (question.answer >= "1" && question.answer <= "4") {
        question.answer = parseInt(question.answer);
      } else {
        if (question.answer >= "A" && question.answer <= "D") {
          newIndex = question.answer.toUpperCase().charCodeAt(0) - 65;
        } else {
          // get first character of answer
          newIndex = question.answer.toUpperCase()[0].charCodeAt(0) - 65;
        }
      }
    } else {
      newIndex = question.answer;
    }
    setAnswerIndex(newIndex);

    let questionText = question.question;
    let indexOfDot = questionText.indexOf(".");
    if (indexOfDot !== -1) {
      if (questionText[indexOfDot + 1] === " ") {
        questionText = questionText.slice(indexOfDot + 2);
      } else {
        questionText = questionText.slice(indexOfDot + 1);
      }
    } else {
      indexOfDot = questionText.indexOf(":");
      if (indexOfDot !== -1) {
        if (questionText[indexOfDot + 1] === " ") {
          questionText = questionText.slice(indexOfDot + 2);
        } else {
          questionText = questionText.slice(indexOfDot + 1);
        }
      }
    }

    setTextQuestion(questionText);
  }, [question]);

  useEffect(() => {
    // console.log(answerIndex);
  }, [answerIndex]);

  return (
    <div className="w-[calc(100%-50px)] ml-2 mt-4 p-4 bg-white border-[1px] drop-shadow-lg  rounded-lg">
      <h1
        contenteditable="true"
        className="outline-none bg-sky-200 p-2 rounded-lg border-[1px] border-sky-900"
      >
        {`              Câu hỏi ${order}: ${textQuestion}`}
      </h1>
      <div className="flex flex-col text-left mt-2">
        {question.options.map((option, index2) => {
          // console.log(answerIndex, index2);

          return (
            <div className="flex items-center  gap-2">
              <label>
                <input
                  type="radio"
                  name={`question-${order}`}
                  className="w-5 h-5 text-orange-600 bg-gray-100 border-orange-300 focus:ring-orange-500"
                  checked={
                    (answerIndex && answerIndex === index2) ||
                    (answerIndex === 0 && index2 === 0)
                  }
                  onChange={() => {
                    setAnswerIndex(index2);
                  }}
                />
              </label>

              <button
                contenteditable="true"
                onClick={() => {
                  setAnswerEdit(index2);
                }}
                className={`text-left mt-2 
                ${
                  (answerEdit && answerEdit === index2) ||
                  (answerEdit === 0 && index2 === 0)
                    ? " border-[1px] border-dashed"
                    : "border-[1px]"
                }
                ${
                  (answerIndex && answerIndex === index2) ||
                  (answerIndex === 0 && index2 === 0)
                    ? "bg-emerald-200 text-emerald-900 border-emerald-600 "
                    : "bg-orange-200 text-orange-900 border-orange-600 "
                }
              }  rounded-lg p-4 `}
              >
                {option}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answer;

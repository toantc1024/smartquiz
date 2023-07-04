import React, { Fragment, useEffect } from "react";
import Quiz from "./Quiz/quiz";
import { useCountdown } from "../../hooks/useCountDown";
const RealQuizz = ({ questions, time }) => {
  const [currentTime, setCurrentTime] = React.useState(time);

  const [days, hours, minutes, seconds] = useCountdown(currentTime);
  const [score, setScore] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [processed, setProcessed] = React.useState(false);
  const processTest = () => {
    if (processed) return;
    setCurrentTime(0);
    const questions = document.querySelectorAll(".question-test");
    let score = 0;
    console.log(questions);
    questions.forEach((question) => {
      const answerIndex = parseInt(question.getAttribute("correct"));

      const choices = question.children[1].children;
      let scoreAtQuestion = 0;
      console.log(choices[0], answerIndex);
      for (let i = 0; i < choices.length; i++) {
        const choice = choices[i].children[0].children[0];
        if (i === answerIndex || (i === 0 && answerIndex === 0)) {
          if (choice.checked) {
            scoreAtQuestion = 1;
            break;
          } else {
            scoreAtQuestion = 0;
          }
        } else {
          scoreAtQuestion = 0;
        }
      }

      score += scoreAtQuestion;
    });
    setScore(score);
    setProcessed(true);
    setModalOpen(true);
    alert("Đã nộp bài");
  };

  useEffect(() => {
    if (processed) return;
    if (days + hours + minutes + seconds <= 0) {
      processTest();
    }
  }, [days, hours, minutes, seconds]);

  return (
    <Fragment>
      <div
        class={`relative z-10 ${modalOpen ? "" : "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      class="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Điểm
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">{score} điểm</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Làm lại
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Xem đáp án
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 px-2 flex items-center justify-center gap-2">
        <div className="block bg-blue-600 text-white p-4 rounded-lg">
          {days + hours + minutes + seconds <= 0 ? (
            <div className="text-2xl font-bold">Hết giờ</div>
          ) : (
            <div>
              Thời gian còn lại: {minutes} phút {seconds} giây
            </div>
          )}
        </div>
        <button
          onClick={() => processTest()}
          className="bg-blue-500  rounded-lg text-white py-4 px-2"
        >
          Nộp bài
        </button>
        {processed && (
          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="bg-orange-500  rounded-lg text-white py-4 px-2"
          >
            Xem điểm
          </button>
        )}{" "}
      </div>

      {questions && (
        <div className="gap-2 flex-col flex  pl-4">
          {questions.choices && (
            <Quiz data={questions.choices} processed={processed} />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default RealQuizz;

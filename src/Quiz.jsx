import React, { Fragment, useEffect, useState } from "react";
import { getSavedTestFromDatabase } from "./utils/firebaseUtils";
import Loading from "./components/Loading";

import { Link } from "react-router-dom";
import RealQuizz from "./components/RealQuiz/Quizz";

const Quiz = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [isQuizStart, setIsQuizStart] = useState(false);

  const getFormInDatabase = async () => {
    setIsLoading(true);
    const params = window.location.pathname.split("/");
    if (params[1] === "test" && params[2]) {
      const form = await getSavedTestFromDatabase(params[2]);
      console.log("called", form);
      if (form) {
        const realForm = { choices: JSON.parse(form.choices) };
        setFormData(realForm);
        setTime(form.time);
        setTitle(form.title);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFormInDatabase();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="">
      {isLoading ? (
        <Loading size="40" />
      ) : formData.length || formData.choices ? (
        !isQuizStart ? (
          <div
            class={`relative z-10 ${!modalOpen ? "hidden" : ""}`}
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
                          Bài kiểm tra: {title}
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Thời gian làm bài: {time} phút
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setModalOpen(false);
                        setIsQuizStart(true);
                        setTimeLeft(Date.now() + time * 50000);
                      }}
                    >
                      Bắt đầu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RealQuizz questions={formData} time={timeLeft} />
        )
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-bold">Không tìm thấy form</h2>
          <Link
            type="submit"
            to="/"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Tạo Quizz bằng AI
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quiz;

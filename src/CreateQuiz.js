import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Quizz from "./components/Quizz";
import Loading from "./components/Loading";
import { generateQuiz } from "./utils/fetchOpenAI";
import { saveTestToDatabase, testGetDatabase } from "./utils/firebaseUtils";
import QRCode from "qrcode.react";
function CreateQuiz() {
  const [time, setTime] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formId, setFormId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(10);
  const [questions, setQuestions] = useState(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("Updated text", text);
  }, [text]);

  const fetchData = async (getData, number) => {
    const data = await generateQuiz(getData, number);
    return data;
  };

  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = await fetchData(text, quantity);
    setQuestions(data);
    setLoading(false);

    // Process here
  };

  return (
    <div className="m-4">
      <div className="m-8 flex items-center justify-center flex-wrap gap-2 flex-col">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Tạo{" "}
          <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            quizz
          </mark>{" "}
          chỉ trong{" "}
          <mark class="py-1 px-2 text-white bg-orange-600 rounded dark:bg-blue-500">
            10 giây
          </mark>{" "}
        </h1>
        <p class="text-lg font-normal italic text-gray-500 lg:text-xl dark:text-gray-400">
          Be anything you can imagine
        </p>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">
              Văn bản
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-0 text-lg text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:ring-blue-200 focus:outline-none border border-gray-300"
              placeholder="Write a comment..."
              required
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tiêu đề
            </label>

            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 focus:outline-none "
              placeholder="Bài kiểm tra 01"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Thời gian làm bài
            </label>

            <input
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 focus:outline-none "
              placeholder="60 phút"
              required
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Số lượng
            </label>
            <input
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 focus:outline-none "
              placeholder="5"
              required
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </div>

          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Tạo Quizz bằng AI
              </button>
            )}
            <div class="flex pl-0 space-x-1 sm:pl-2 text-gray-500">
              Made with ❤
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <div className="flex justify-start ml-4 gap-2">
          <button
            type="submit"
            class="block w-auto items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-600 rounded-lg focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900 hover:bg-orange-700"
            onClick={async () => {
              const formId = await saveTestToDatabase(questions, title, time);
              if (formId) {
                setFormId(formId);
                setError(false);
              } else {
                setError("Có lỗi xảy ra, vui lòng thử lại sau!");
              }

              setIsModalOpen(true);
            }}
          >
            Tạo link
          </button>

          {formId && (
            <button
              class="block w-auto items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-emerald-600 rounded-lg focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900 hover:emeraldorange-700"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Xem lại link
            </button>
          )}
        </div>
        <Quizz questions={questions} />
      </div>
      <div
        class={`${!isModalOpen ? "hidden" : ""} relative z-10`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex items-center flex-col w-full sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      class="text-lg font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {error === false ? "Tạo link thành công" : error}
                    </h3>
                    <div class="mt-2">
                      {!error && (
                        <div class="flex flex-col items-center w-full text-sm text-gray-500">
                          <QRCode
                            id="form-id-qr"
                            value={`${process.env.REACT_APP_HOST_URL}/test/${formId}`}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                          />
                          <div className="flex gap-2">
                            <button
                              className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white ${
                                copied
                                  ? "bg-emerald-700 focus:ring-emerald-200  hover:bg-emerald-800"
                                  : "bg-blue-700 focus:ring-blue-200  hover:bg-blue-800"
                              } rounded-lg focus:ring-4 `}
                              onClick={() => {
                                if (copied) return;

                                navigator.clipboard.writeText(
                                  `${process.env.REACT_APP_HOST_URL}/test/${formId}`
                                );
                                setCopied(true);

                                setTimeout(() => {
                                  setCopied(false);
                                }, 1500);
                              }}
                            >
                              {copied ? "Đã copy" : "Copy link"}
                            </button>
                            <button
                              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                              onClick={() => {
                                const canvas =
                                  document.getElementById("form-id-qr");
                                const pngUrl = canvas
                                  .toDataURL("image/png")
                                  .replace("image/png", "image/octet-stream");
                                let downloadLink = document.createElement("a");
                                downloadLink.href = pngUrl;
                                downloadLink.download = `${formId}.png`;
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                              }}
                            >
                              Lưu về máy
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;

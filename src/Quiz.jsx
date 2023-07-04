import React, { useEffect, useState } from "react";
import { getSavedTestFromDatabase } from "./utils/firebaseUtils";
import Loading from "./components/Loading";
import Quizz from "./components/Quizz";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const getFormInDatabase = async () => {
    setIsLoading(true);
    const params = window.location.pathname.split("/");
    if (params[1] === "test" && params[2]) {
      const form = await getSavedTestFromDatabase(params[2]);
      console.log("called", form);
      if (form) {
        const realForm = { choices: JSON.parse(form.choices) };
        setFormData(realForm);
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
        <Quizz questions={formData} />
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

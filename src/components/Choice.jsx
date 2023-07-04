import React from "react";

const Choice = ({ unique_key, content }) => {
  return (
    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
      <input
        id={`${unique_key}`}
        type="radio"
        value=""
        name="bordered-radio"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for={`${unique_key}`}
        class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {content}
      </label>
    </div>
  );
};

export default Choice;

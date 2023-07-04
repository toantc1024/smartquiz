export const generateQuiz = async (passage, numQuestions) => {
  console.log("PROCESSING..");
  try {
    const prompt = `

    Tạo ${numQuestions} câu quizz từ đoạn văn sau: ${passage}
    \nQuestion title?\nA. Option A\nB. Option B \nC. Option C \nD. Option D \nAnswer: Answer text\n

    The answer should be the 0-indexed number of the correct choice. Return answer and question language of the passage.

    `;
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 3072,
          n: numQuestions,
          stop: "\n\n",
        }),
      }
    );

    const data = await response.json();
    console.log("RESPONSE", data);

    const checkValidAnswer = (answer) => {
      const validAnswers = ["A.", "B.", "C.", "D."];
      return validAnswers.includes(answer);
    };

    const choices = data.choices.map((choice) => {
      try {
        const lines = choice.text.split("\n").filter((line) => line.length > 0);

        const question = lines[0];
        const options = lines.slice(1, 5);
        const answer = lines[5].split("Answer: ")[1];

        return {
          question,
          options,
          answer,
        };
        console.log({ question, options, answer });
      } catch {
        console.log("ERROR");
        return null;
      }
    });
    // filter null from choices
    const filteredChoices = choices.filter((choice) => choice !== null);
    console.log(filteredChoices);
    return { choices: filteredChoices };
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

//MockAPI
// export const generateQuiz = (passage, numQuestions) => {
//   return {
//     choices: [
//       {
//         question:
//           "Q1. Which tool editors used to input the content of the quiz?",
//         options: [
//           "A. Google Spreadsheet Template ",
//           "B. Tabletop.js",
//           "C. Authoring tool ",
//           "D. quiz.js ",
//         ],
//         answer: "A",
//       },
//       {
//         question:
//           "Q. What tool do editors use to input the content of the quiz?",
//         options: [
//           "A. Google Spreadsheet Template",
//           "B. MS Excel",
//           "C. Tabletop.js",
//           "D. CMS",
//         ],
//         answer: "A",
//       },
//       {
//         question: "1. What powers the quiz tool?",
//         options: [
//           "A. Amazon S3",
//           "B. Tabletop.js ",
//           "C. Google Spreadsheets ",
//           "D. Vox Media",
//         ],
//         answer: "C",
//       },
//       {
//         question:
//           "Q1. What is the main purpose of Google Spreadsheet Template?",
//         options: [
//           "A. To save data",
//           "B. To collect data",
//           "C. To input the content of the quiz",
//           "D. To publish the spreadsheet to the web",
//         ],
//         answer: "C",
//       },
//       {
//         question: "Q1. What powers the quiz tool?",
//         options: [
//           "A. Tabletop.js",
//           "B. Google Spreadsheets",
//           "C. Amazon S3",
//           "D. Quiz.js",
//         ],
//         answer: "B",
//       },
//       {
//         question:
//           "Q1. What does the authoring tool use to collect the spreadsheet data?",
//         options: [
//           "A. Networking",
//           "B. Google Spreadsheets",
//           "C. Tabletop.js",
//           "D. JavaScript",
//         ],
//         answer: "C",
//       },
//       {
//         question: "Q. What does Tabletop.js do?",
//         options: [
//           "A. Publish the spreadsheet to the web",
//           "B. Collect the spreadsheet data",
//           "C. Generate a vertical-specific stylesheet URL",
//           "D. Copy and paste the embed code",
//         ],
//         answer: "B",
//       },
//       {
//         question: "1. What does the quiz tool use to power it? ",
//         options: [
//           "A. Google Spreadsheet",
//           "B. Tabletop.js",
//           "C. Amazon S3",
//           "D. Quiz.js",
//         ],
//         answer: "A",
//       },
//       {
//         question: "Q. What does the quiz tool use to input data?",
//         options: [
//           "A. Google Spreadsheet Template",
//           "B. JSON Object",
//           "C. Tabletop.js",
//           "D. A Vertical-specific stylesheet URL",
//         ],
//         answer: "A. Google Spreadsheet Template",
//       },
//       {
//         question: "A. What is Google Spreadsheets?",
//         options: [
//           "B. What data does the authoring tool use?",
//           "C. How do you publish a quiz to the web?",
//           "D. What is Tabletop.js used for? ",
//           "E. What do editors need when making a change to the spreadsheet?",
//         ],
//         answer: undefined,
//       },
//     ],
//   };
// };

import React from "react";

const Question = ({ index, title }) => {
  return <div>{`${index}. ${title}`}</div>;
};

export default Question;

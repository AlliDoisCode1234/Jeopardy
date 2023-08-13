import { Question } from "@/types/board";
import styled from "styled-components";
import { questions } from "@/data/questions";

// Styled components
const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
`;

const QuestionTile = styled.div`
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Board = () => {
  return (
    <BoardContainer>
      {questions.map((question: Question) => (
        <QuestionTile key={question.id}>${question.value}</QuestionTile>
      ))}
    </BoardContainer>
  );
};

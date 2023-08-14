import { useState, useEffect } from "react";

import { Question } from "@/types/board";
import styled from "styled-components";
import { questions } from "@/data/questions";
import { categories } from "@/data/categories";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Styled components
const BoardContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  padding: 20px;
`;

/* const QuestionTile = styled.div` */
/*   background-color: #007bff; */
/*   color: white; */
/*   padding: 20px; */
/*   text-align: center; */
/*   cursor: pointer; */
/*   transition: background-color 0.2s ease-in-out; */

/*   &:hover { */
/*     background-color: #0056b3; */
/*   } */
/* `; */

// 
const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
`;

const CategoryTile = styled.div`
  background-color: #0056b3;
  color: white;
  padding: 20px;
  text-align: center;
`;

export const Board = () => {
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [team1Score, setTeam1Score] = useState<number>(
    Number(localStorage.getItem("team1Score")) || 0
  );
  const [team2Score, setTeam2Score] = useState<number>(
    Number(localStorage.getItem("team2Score")) || 0
  );
  const [team1Clicked, setTeam1Clicked] = useState<boolean>(false);
  const [team2Clicked, setTeam2Clicked] = useState<boolean>(false);

  // handle scores; toggles between addition and resetting 
  const handleTeam1Correct = () => {
    if (!team1Clicked) {
      setTeam1Score((prevScore) => prevScore + selectedQuestion!.value);
      setTeam1Clicked(true);
    } else {
      setTeam1Score((prevScore) => prevScore - selectedQuestion!.value);
      setTeam1Clicked(false);
    }
  };

  const handleTeam2Correct = () => {
    if (!team2Clicked) {
      setTeam2Score((prevScore) => prevScore + selectedQuestion!.value);
      setTeam2Clicked(true);
    } else {
      setTeam2Score((prevScore) => prevScore - selectedQuestion!.value);
      setTeam2Clicked(false);
    }
  };

  // Reset everything
  const reset = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Clicked(false);
    setTeam2Clicked(false);
  };

  // Reset clicked states when a new question is selected
  useEffect(() => {
    setTeam1Clicked(false);
    setTeam2Clicked(false);
  }, [selectedQuestion]);

  // Set new score for team 1 in localStorage when score is updated
  useEffect(() => {
    localStorage.setItem("team1Score", team1Score.toString());
  }, [team1Score]);

  // Set new score for team 2 in localStorage when score is updated
  useEffect(() => {
    localStorage.setItem("team2Score", team2Score.toString());
  }, [team2Score]);

  return (
    <>
      {/* Categories */}
      <CategoriesContainer>
        {categories.map((category) => (
            <CategoryTile>
                {category}
            </CategoryTile>
        ))}
      </CategoriesContainer>
      {/* Game Board */}
      <BoardContainer>
        {questions.map((question: Question) => (
          <Dialog key={question.id}>
            <DialogTrigger
              className="dialog-trigger"
              onClick={() => setSelectedQuestion(question)}
            >
              {question.value}
            </DialogTrigger>
            <DialogContent className="dialog-content">
              <DialogHeader>
                <DialogTitle>{question.question}</DialogTitle>
                <DialogDescription>{question.question}</DialogDescription>
              </DialogHeader>
              {/* Show answer */}
              <Button onClick={() => setIsAnswerShown(!isAnswerShown)}>
                Toggle Answer
              </Button>
              {isAnswerShown && (
                <div>
                  <p>{question.answer}</p>
                  <div>
                    <Button onClick={handleTeam1Correct}>Team 1 Correct</Button>
                    <Button onClick={handleTeam2Correct}>Team 2 Correct</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </BoardContainer>
      {/* Scoreboard & Reset Button */}
      <div id="scoreboard">
        <p>
          <span className="team-name">Team 1: </span>
          {team1Score}
        </p>
        <p>
          <span className="team-name">Team 2: </span>
          {team2Score}
        </p>
        <Button id="reset-button" onClick={reset}>Reset</Button>
      </div>
    </>
  );
};

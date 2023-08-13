export type Question = {
  id: number;
  category: Category;
  value: number;
  question: string;
  answer: string;
};

export enum Category {
  Animals = "Animals",
  Food = "Food",
  Geography = "Geography",
  History = "History",
  Music = "Music",
}

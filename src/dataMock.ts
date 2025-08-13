const boardsList = [
  { id: "0", name: "board 1" },
  { id: "1", name: "board 2" },
  { id: "2", name: "board 3" },
  { id: "3", name: "board 4" },
  { id: "4", name: "board 5" },
  { id: "5", name: "board 6" },
];

const topicsList = [
  {
    id: "0",
    name: "topic 1",
    cards: [
      { id: "0", title: "card 1 title" },
      { id: "1", title: "card 2 title" },
      { id: "2", title: "card 3 title" },
    ],
  },
  {
    id: "1",
    name: "topic 2",
    cards: [
      { id: "3", title: "card 4 title" },
      { id: "4", title: "card 5 title" },
      { id: "5", title: "card 6 title" },
    ],
  },
  {
    id: "2",
    name: "topic 3",
    cards: [
      { id: "6", title: "card 7 title" },
      { id: "7", title: "card 8 title" },
      { id: "8", title: "card 9 title" },
    ],
  },
];

export { boardsList, topicsList };

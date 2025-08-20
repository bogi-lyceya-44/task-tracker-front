export type TaskCardType = {
  id: string;
  title: string;
  description: string;
};

export type BodyType = {
  [key: string]: number | string | string[] | never | BodyType | BodyType[];
};

export type BoardMode = "topics" | "calendar";

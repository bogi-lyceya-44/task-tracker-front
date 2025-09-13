export type TaskCardType = {
  id: string;
  name: string;
  description?: string;
};

export type TopicColumnType = {
  id: string;
  name: string;
  taskIds: string[];
};

export type BoardCardType = {
  id: string;
  name: string;
};

export type BodyType = {
  [key: string]: number | string | string[] | never | BodyType | BodyType[];
};

export type BoardMode = "topics" | "calendar";

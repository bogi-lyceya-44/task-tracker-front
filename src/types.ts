export type TaskCardType = {
  id: string;
  title: string;
};

export type BodyType = {
  [key: string]: number | string | string[] | never | BodyType | BodyType[];
};

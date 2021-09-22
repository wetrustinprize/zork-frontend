import { Entity } from "@services/utils";

export type User = Entity & {
  fullname: string;
  email: string;
  first_name: string;
  last_name: string;
  zorks: number;
};

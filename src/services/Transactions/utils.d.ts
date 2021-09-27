import { User } from "@services/User/utils";
import { Entity } from "@services/utils";

export type Transaction = Entity & {
  zorks: number;
  from_id: string;
  to_id: string;
  description: string;
  public: boolean;
  from_user?: User;
  to_user?: User;
};

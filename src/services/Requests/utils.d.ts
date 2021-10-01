import { Transaction } from "@services/Transactions/utils";
import { User } from "@services/User/utils";
import { Entity } from "@services/utils";

export type Request = Entity & {
  zorks: number;
  last_zorks: number;
  description: string;
  request_canceled: boolean;
  request_result: Transaction;
  from_id: string;
  from_user: User;
  to_id: string;
  to_user: User;
};

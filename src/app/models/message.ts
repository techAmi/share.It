import { User } from './user';
export interface Message {
  $key?: string;
  body: string;
  sender: User;
  sentAt: number
}

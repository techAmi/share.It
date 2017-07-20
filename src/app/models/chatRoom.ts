import { User } from './user';
import { Message } from './message';

export interface ChatRoom {
  $key?: string;
  users: User[];
  messagesThread: Message[];
}

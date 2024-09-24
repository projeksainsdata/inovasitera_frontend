import { User } from './auth.type';

interface UserEvent extends User {
  department: {
    id: number;
    name: string;
  };
}
export interface Event {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link_ig: string;

  // categories event base on time
  date_start: string;
  date_end: string;

  // relation
  author_id?: String;
  author: UserEvent;
  categories: {
    id: number;
    name: string;
  };
}

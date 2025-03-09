import { User } from './user.model';
import {Category} from "./category.model";

export interface Event {
  id : string;
  title : string;
  description : string;
  city : string;
  location : string;
  date : string;
  capacity : number;
  available_seats : number;
  price : number;
  user: User;
  category: Category;
}

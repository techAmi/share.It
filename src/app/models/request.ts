import { User } from './user';
import { Item } from './item';

export interface Request {
    $key?: string;
    requestFrom?: User;
    requestedItem?: Item;
    requestStarts: Date;
    requestEnds: Date;
    message?: string;
    createdAt?: Date;
    status?: number;
}

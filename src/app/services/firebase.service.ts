import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../models/item';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Request } from '../models/request';
import { Condition } from '../models/condition';
import { ChatRoom } from '../models/chatRoom';
import { AuthService } from './auth.service';
import { Message } from '../models/message';
import * as firebase from 'firebase';

@Injectable()

export class FirebaseService {
  items: FirebaseListObservable<Item[]>;
  myItems: Item[];
  borrowedItems: Item[];
  users: FirebaseListObservable<User[]>;
  requests: FirebaseListObservable<Request[]>;

  public filteredRequests: {
    incomingRequests: Request[],
    outcomingRequests: Request[]
  };
  recentlyAddedItems: FirebaseListObservable<Item[]>;
  categories: FirebaseListObservable<Category[]>;
  conditions: FirebaseListObservable<Condition[]>;
  chatRoomsObservable: FirebaseListObservable<ChatRoom[]>;
  messages: FirebaseListObservable<Message[]>;
  chatRooms: ChatRoom[];
  chatRoom: ChatRoom;
  public myItemsCount = 0;
  private user: User;
  private item: Item;

  constructor(
    private _db: AngularFireDatabase,
    private _as: AuthService) {

      this.items = this._db.list('/items') as
      FirebaseListObservable<Item[]>;
      this.chatRoomsObservable = this._db.list('/messages') as
      FirebaseListObservable<ChatRoom[]>;
      this.chatRoomsObservable.subscribe(rooms => {
        this.chatRooms = rooms;
      });

      this.myItems = [];


  }
  getItems () {
    this.items = this._db.list('/items') as
    FirebaseListObservable<Item[]>;
    return this.items;
  }

  getItem($key: string) {
    let item: Item;
    this.getItems().subscribe(items => {
      for (const entry of items) {
        if (entry.$key === $key) {
          item = entry;
        }
      }
    });
    return item;
  }


  getMyItems(userId: string) {
    this.myItems = [];
    console.log('current user ', userId);
    this.items.subscribe(items => {
      for (const entry of items) {
        console.log('item: ', entry);
        if (entry.itemOwner.userUid === userId) {
          this.myItemsCount++;
          this.myItems.push(entry);
        }
      }
    });
    console.log(this.myItems);
    console.log('>>>> my items count', this.myItemsCount);
    return this.myItems;
  }

  searchItems(keyword: string) {
    return this._db.list('/items', {
      query: {
        orderByChild: 'itemName',
        equalTo: keyword
      }
    }) as
    FirebaseListObservable<Item[]>
  }
  getBorrowedItems(userId: string) {
    this.borrowedItems = [];
    this.getRequests().subscribe(requests => {
      for (const entry of requests ) {
        if (entry.requestFrom.userUid === userId && entry.status === 3) {
          this.borrowedItems.push(entry.requestedItem);
        }
      }
    });
    return this.borrowedItems;
  }
  getCategories() {
    this.categories = this._db.list('/categories') as
    FirebaseListObservable<Category[]>;
    return this.categories;
  }

  getConditions() {
    this.conditions = this._db.list('/Conditions') as
    FirebaseListObservable<Condition[]>;
    return this.conditions;
  }

  addItem(item: Item) {
    console.log('will add a new item', item);
    item.createAt = firebase.database.ServerValue.TIMESTAMP;
    return this.items.push(item);

  }

  getRecentlyAddedItems() {
    this.recentlyAddedItems = this._db.list('/items', {
      query: {
        orderByChild: 'createAt',
        limitToLast: 10
      }
    }) as
    FirebaseListObservable<Item[]>;

    return this.recentlyAddedItems;
  }

  filterRecentlyAddedItems() {
    let filtredRecentlyAddedItems: Item[];
    filtredRecentlyAddedItems = [];
    this.getRecentlyAddedItems().subscribe(items => {
      items.forEach(item => {
        if (item.itemOwner.userUid !== this._as.getUserInformation().userUid) {
          filtredRecentlyAddedItems.push(item);
        }
      })
    });
    return filtredRecentlyAddedItems;
  }

  updateItem(key: string, updItem: Item) {
    return this.items.update(key, updItem);
  }

  deleteItem(key: string) {
    return this.items.remove(key);
  }

  getRequests() {
    this.requests = this._db.list('/requests') as
    FirebaseListObservable<Request[]>;
    return this.requests;
  }

  filterRequests() {
    this.filteredRequests = {
      incomingRequests: [],
      outcomingRequests: []
    }
    this.getRequests().subscribe(requests => {
      requests.forEach( request => {
        if (request.requestedItem.itemOwner.userUid === this._as.getUserInformation().userUid) {
          this.filteredRequests.incomingRequests.push(request);
        }
      });
      requests.forEach( request => {
        if (request.requestFrom.userUid === this._as.getUserInformation().userUid ) {
          this.filteredRequests.outcomingRequests.push(request);
        }
      })
    });
    return this.filteredRequests;
  }

  appendRequest(request: Request) {
    this.getRequests();
    return this.requests.push(request);
  }

  updateRequest(key: string, request: Request) {
    return this.requests.update(key, request);
  }

  getUsers() {
    this.users = this._db.list('/users') as
    FirebaseListObservable<User[]>;
    return this.users;
  }

  getCurrentUser(): User {
    let currentUser: User;
    this.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.userUid === this._as.getUserInformation().userUid) {
          currentUser = user;
        }
      })
    });
    return currentUser;
  }

  updateUser(user: User) {
    return this.getUsers().update(user.userUid, user);
  }

  getChatRooms() {
    this.chatRoomsObservable = this._db.list('/messages') as
    FirebaseListObservable<ChatRoom[]>;
    return this.chatRoomsObservable;
  }

  getChatRoom(sender: User, receiver: User) {
    this.chatRooms.forEach (room => {
        if ((room.users[0].userUid === sender.userUid || room.users[0].userUid === receiver.userUid) &&
            (room.users[1].userUid === sender.userUid || room.users[1].userUid === receiver.userUid)) {
              this.chatRoom = room;
        }
    });
      return this.chatRoom;
  }

  getChatRoomByKey(key: string) {
    this.chatRooms.forEach( chatroom => {
      if (chatroom.$key === key) {
        this.chatRoom = chatroom;
      }
    });
    return this.chatRoom;
  }

  appendChatRoom($key: string, chatRoom: ChatRoom) {
    // let chatRooms = this.getChatRooms();
    // chatRooms.update($key, chatRoom);
  }

  appendMessage(msg: string, receiver: User) {
    const sender = this._as.getUserInformation() as User;
    console.log('this is the sender', sender);
    this.chatRoom = this.getChatRoom(sender, receiver);
    console.log('the already existing chat room', this.chatRoom);
    let newChatRoom: ChatRoom;
    let message: Message;
    newChatRoom = {
      users: [],
      messagesThread: []
    }
    message = {
      sender: sender,
      body: msg
    }

    newChatRoom.users.push(sender, receiver);
    // if the chat room already exists just update it
    if (this.chatRoom) {
      newChatRoom.messagesThread = this.chatRoom.messagesThread;
      newChatRoom.messagesThread.push(message); // doing this to keep new message on top of message thread
      this.chatRoomsObservable.update(this.chatRoom.$key, newChatRoom);
    } else {
      newChatRoom.messagesThread.push(message);
      this.chatRoomsObservable.push(newChatRoom);
    }


  }

  getMessages(key: string) {
    this.messages = this._db.list(`/messages/${key}/messagesThread`) as
    FirebaseListObservable<Message[]>;
    return this.messages;
  }

  getLastMessage(key: string) {
    let lastMessage: Message[];
    this._db.list(`/messages/${key}/messagesThread`, {
      query : {
        limitToLast: 1
      }
    }).subscribe(message => {
      lastMessage = message;
    });
    return lastMessage;
  }
}


import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { ChatRoom } from '../../models/chatRoom';
import { Message } from '../../models/message';


@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css']

})

export class MessagesComponent implements OnInit {
  private allChatRooms: ChatRoom[];
  public currentUserChatRooms: ChatRoom[];
  public chatElements: any[];
  public lastMessages: Message[];
  constructor(
    private _firebaseService: FirebaseService,
    private _as: AuthService
  ) {
    this.currentUserChatRooms = [];
    this.chatElements = [];
  }

  ngOnInit() {

    const currentUserUid = this._as.getUserInformation().userUid;
    this._firebaseService.getChatRooms().subscribe(chatRooms => {
      this.allChatRooms = chatRooms;
    });
    this.allChatRooms.forEach(chatroom => {
      // check which chat rooms are current user's chat rooms
      chatroom.users.forEach(user => {
        if (user.userUid === currentUserUid) {
          this.currentUserChatRooms.push(chatroom);
        }
      });


    });

    this.currentUserChatRooms.forEach( chatRoom => {
      this.chatElements.push(
        {
          lastMessage: chatRoom.messagesThread[Object.keys(chatRoom.messagesThread)[Object.keys(chatRoom.messagesThread).length - 1]],
          chatRoomKey: chatRoom.$key
        }
      )
    });
    // TODO: Fix this later
    // this.currentUserChatRooms.forEach(chatroom => {
    //   this.lastMessages.push(this._firebaseService.getLastMessage(chatroom.$key));
    // });
  }
}

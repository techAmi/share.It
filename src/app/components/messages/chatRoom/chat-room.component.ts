import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthService } from '../../../services/auth.service';
import { ChatRoom } from '../../../models/chatRoom';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';

@Component({
  moduleId: module.id,
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent {

  public chatRoom: ChatRoom;
  public messages;
  msgVal: '';
  constructor(
    private _route: ActivatedRoute,
    private _firebaseService: FirebaseService,
    private _as: AuthService) {
    _route.params
    .map(params => params['id'])
    .subscribe( id => {
      this.chatRoom = this._firebaseService.getChatRoomByKey(id);
      this.messages = this._firebaseService.getMessages(id);
    });

  }

  sendMessage(msg: string) {
    this.messages.push(
      {
        body: msg,
        sender: this._as.getUserInformation(), // the sender is the current user logged in
        sentAt: Date.now()
      }
    );
    this.msgVal = '';
  }
}

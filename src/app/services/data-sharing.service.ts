import { Injectable } from '@angular/core';
import { Branche } from '../models/branche';
@Injectable()

export class DataSharingService {
  public category: any;
  public branches: Branche[];
}

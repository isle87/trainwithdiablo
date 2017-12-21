import { Injectable } from '@angular/core';
import { EnumStatus } from '../models/enum-status';



export const AutorisationStatus = {
  blogDelete: EnumStatus.mod,
  blogWrite: EnumStatus.author,
  blogEdit: EnumStatus.authorown,
  comment: EnumStatus.user
};

@Injectable()
export class AuthService {

  constructor() {
    console.log(AutorisationStatus.blogWrite);
  }

}

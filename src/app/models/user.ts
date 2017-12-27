import { EnumStatus } from './enum-status';

export class User {

  constructor(
    public name: string,
    public password: string,
    public status: EnumStatus,
    public id?: number,
    ) {
  }
}

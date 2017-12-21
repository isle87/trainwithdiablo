import { EnumStatus } from './enum-status';

export class User {

  constructor(
    public Name: string,
    public Password: string,
    public Status: EnumStatus,
    public Id?: number,
    ) {
  }
}

export class Comment {
  constructor(
    public  Text: string,
    public  PubDate?: string,
    public  UserName?: string,
    public  UserId?: number,
    public  postId?: number,
    public  id?: number,
  ) {}
}

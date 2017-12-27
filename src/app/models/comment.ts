export class Comment {
  constructor(
    public  text: string,
    public  pubDate?: string,
    public  username?: string,
    public  userId?: number,
    public  postId?: number,
    public  id?: number,
  ) {}
}

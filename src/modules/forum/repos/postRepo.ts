import { Post } from "../domain/post";
import { PostDetails } from "../domain/postDetails";
import { PostId } from "../domain/postId";

export interface IPostRepo {
  getPostDetailsBySlug (slug: string): Promise<PostDetails>;
  getPostBySlug (slug: string): Promise<Post>;
  getRecentPosts (offset?: number): Promise<PostDetails[]>;
  getPopularPosts (offset?: number): Promise<PostDetails[]>;
  getFiveMostPopularPosts (limit?: number): Promise<PostDetails[]>;
  getNumberOfCommentsByPostId (postId: PostId | string): Promise<number>;
  getPostByPostId (postId: PostId | string): Promise<Post>;
  exists (postId: PostId): Promise<boolean>;
  save (post: Post): Promise<void>;
  delete (postId: PostId): Promise<void>;
}
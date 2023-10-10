import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { GetFiveMostPopularPostsRequestDTO } from "./GetFiveMostPopularPostsRequestDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { PostDetails } from "../../../domain/postDetails";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDetails[]>
>

export class GetFiveMostPopularPosts implements UseCase<GetFiveMostPopularPostsRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  
  public async execute (req: GetFiveMostPopularPostsRequestDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getFiveMostPopularPosts(req.limit);
      return right(Result.ok<PostDetails[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
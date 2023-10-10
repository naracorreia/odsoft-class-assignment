import * as express from 'express'

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetFiveMostPopularPosts } from "./GetFiveMostPopularPosts";
import { GetFiveMostPopularPostsRequestDTO } from "./GetFiveMostPopularPostsRequestDTO";
import { GetFiveMostPopularPostsResponseDTO } from "./GetFiveMostPopularPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";

export class GetFiveMostPopularPostsController extends BaseController {
  private useCase: GetFiveMostPopularPosts;

  constructor (useCase: GetFiveMostPopularPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {

    const dto: GetFiveMostPopularPostsRequestDTO = {
      limit: req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        const postDetails = result.value.getValue();
        return this.ok<GetFiveMostPopularPostsResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
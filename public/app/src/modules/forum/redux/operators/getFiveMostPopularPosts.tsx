import * as actionCreators from '../actionCreators'

import { Post } from '../../models/Post';
import { postService } from '../../services';

function getFiveMostPopularPosts (offset?: number) {
  return async (dispatch: any) => {

    dispatch(actionCreators.getFiveMostPopularPosts());

    const result = await postService.getFiveMostPopularPosts(offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getFiveMostPopularPostsFailure(error))
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(actionCreators.getFiveMostPopularPostsSuccess(posts));
    }
  };
}

export { getFiveMostPopularPosts };

import { GetFiveMostPopularPosts } from "./GetFiveMostPopularPosts";
import { GetFiveMostPopularPostsController } from "./GetFiveMostPopularPostsController";
import { postRepo } from "../../../repos";

const getFiveMostPopularPosts = new GetFiveMostPopularPosts(postRepo);

const getFiveMostPopularPostsController = new GetFiveMostPopularPostsController(
    getFiveMostPopularPosts
)

export {
    getFiveMostPopularPosts,
    getFiveMostPopularPostsController
}


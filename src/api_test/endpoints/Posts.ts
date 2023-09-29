/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/

import { AEndpoint } from "./abstracts/AEndpoint";
import { AxiosResponse } from "axios";

export default class Posts extends AEndpoint {
  constructor() {
    super("/posts", "posts");
  }

  /**
   * 
   * @returns {array} List of Poupular posts
   */
  public async getPopularPosts(): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/popular" });
  }
}

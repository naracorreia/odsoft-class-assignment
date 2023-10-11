import "../styles/PostMeta.sass"

import { Link } from "react-router-dom";
import { Post } from '../../../../models/Post'
import React from 'react'
import moment from 'moment';

interface PostMetaProps extends Post {
  includeLink?: boolean;
}

const PostMeta: React.FC<PostMetaProps> = (props) => (
  <div className={moment(props.createdAt).date() < moment().date() ? 'post-row-content' : 'post-row-content-today'}>
    {props.includeLink === false ? '' : <Link to={`/discuss/${props.slug}`} className="title">"{props.title}" {props.link ? <span className="link">[link]</span> : ''}</Link>}
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `} <Link to={`/member/${props.postAuthor}`}>{props.postAuthor}</Link> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;
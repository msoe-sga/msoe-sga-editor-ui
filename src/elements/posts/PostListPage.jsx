import React from 'react';
import postData from './testPostData.json';
import { Nav } from 'react-bootstrap';

export default function PostListPage() {

		return <div className="mt-2">
		<h2>Posts</h2>
		<hr/>
		{Object.keys(postData.posts).map(post => {
            
            return (
                <PostPreview key={postData.posts[post].title}
                post={postData.posts[post]} />

            );
        })}

		</div>

}

const PostPreview = (props) => {

  const dateString = new Date(props.post.date).toDateString();
  console.log(dateString);
  return (

    <div className="mb-5">
	<Nav.Link href='/posts/edit'>
        <h4>{props.post.title}</h4>
    </Nav.Link>
   
    	<div>Author: {props.post.author}</div>
    	<div>Date: {dateString}</div>

    </div>
  )
}
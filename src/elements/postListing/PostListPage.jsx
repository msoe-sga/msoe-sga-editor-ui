import React from 'react';
import Button from 'react-bootstrap/Button';
import postData from './testPostData.json';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default function PostListPage() {

  	 const history = useHistory();
	   const goToNewPost = () =>{ 
	    let path = `newPath`; 
	    history.push('/posts/new');
	  }


	return <div className="pt-2">
	<h2 className="pb-2" >Posts</h2>
	<Button variant="primary" onClick={goToNewPost}>+ New </Button>
	<hr/>

	{Object.keys(postData.posts).map(post => {
        
        return (
            <PostPreview key={postData.posts[post].title}
            post={postData.posts[post]}/>

        );
    })}

	</div>

}



const PostPreview = (props) => {

  const dateString = new Date(props.post.date).toDateString();
  console.log(dateString);
  return (

    <div className="mb-5">
    <Link to='/posts/edit'><h4>{props.post.title}</h4></Link>

   
    	<div>Author: {props.post.author}</div>
    	<div>Date: {dateString}</div>

    </div>
  )
}
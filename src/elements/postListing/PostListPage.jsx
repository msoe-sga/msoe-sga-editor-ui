import React from 'react';
import Button from 'react-bootstrap/Button';
import postData from './testPostData.json';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAllPosts } from '../../api/posts';
import Alert from 'react-bootstrap/Alert';

export default function PostListPage() {

    const history = useHistory();
    const goToNewPost = () =>{
        let path = `newPath`; 
        history.push('/posts/new');
    }

    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = Reackt.useState(null);

    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        if (isLoading) {
            getAllPosts(authToken, json => {
                if (json.isAuthorized === false) {
                    dispatch(setAuthError(json.error));
                    history.push('/');
                } else if (json.error) {
                    setErrorMessage(json.error);
                } else {
                    posts = setPosts(json.existingPosts);
                }
                setIsLoading(false);
            });
        }
    });


    return(
        <div>
            {isLoading && <div>Loading...</div>}
	    {!isLoading &&
                <div>
                    {errorMessage && (
                        <Alert variant='danger'>{error}</Alert>
                    )}
                    <div className="pt-2">
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
                </div>}

        </div>
    );
}



const PostPreview = (props) => {

  return (

    <div className="mb-5">
    <Link to='/posts/edit'><h4>{props.post.title}</h4></Link>

   
    	<div>Author: {props.post.author}</div>

    </div>
  )
}

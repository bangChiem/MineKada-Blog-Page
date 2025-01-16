import { useState, useEffect, React } from 'react';

import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../../CommentsList/CommentsList';
import AddCommentForm from '../../AddCommentForm/AddCommentForm';
import "./ArticlePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useUser from '../../useUser';

export default function ArticlePage( {images} ) {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments:initialComments, title: title, content: content, imageId:imageId, upvoteIds:upvoteIds} = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const [upvoteImg, setUpvoteImg] = useState("/Like.png");
  const [userHasLiked, setUserHasLiked] = useState(false);

  const { isLoading, user } = useUser();

  useEffect(() => {
    if(user && !isLoading && upvoteIds && upvoteIds.includes(user.uid)){
      setUpvoteImg('/Liked.png');
      setUserHasLiked(true);
    };
  }, [upvoteIds, user]);

  const paragraphs = content.split("\n").map((text, index) => (
    <p key={index}>
      {text.split("\t").map((segment, i) => (
        <span key={i}>
          {i > 0 && <span style={{ whiteSpace: "pre" }}>{"\t"}</span>}
          {segment}
        </span>
      ))}
    </p>
  ));
  
  
  
  async function onUpvoteClicked() {
    try{
      if(!userHasLiked){
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        setUpvoteImg("/Liked.png")
        const response = await axios.post('/api/articles/' + name + '/upvote', null, { headers});
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes);
        setUserHasLiked(true);
      }
      console.log("has already liked")
    } catch(err){
      console.error("Failed to increment upvote for article " + name + " / from ArticlePage");
      console.error(err);
    }
  }

  async function onAddComment( {nameText, commentText}) {
    try{
      const response = await axios.post('/api/articles/' + name + '/comments', {
        postedBy: nameText,
        text: commentText,
      });
      const updatedArticleData = response.data;
      setComments(updatedArticleData.comments);
    } catch(err){
      console.error("Failed to post comment for article " + name + "/ from Article Page");
    }
  }

  return (
    <div className='backdrop'>
      <Container fluid className='page-container article-page'>
        <Row>
          <Col lg={9} sm={12} className='article-container'>
          <div>
            <h1>{title}</h1>
              <img src={images[imageId]}/>
              <div className='article-content'>
                {paragraphs}
              </div>
          </div>
          
          </Col>

          <Col lg={3} sm={12} className='upvote-comment-container'>
          {user ? <div className='upvote-button'>
            <span>Like</span>
            <span className='upvote-counter'>{upvotes}</span>
            <img onClick={onUpvoteClicked} className={userHasLiked ? "liked" : "like"} width="40px" height="40px" src={upvoteImg}></img>
          </div>: <p>log in to upvote</p>} 

            <div className='comment-container'>
              {user ? <div>
                <h1>Comments</h1>
                <AddCommentForm onAddComment={onAddComment}/>
              </div>: <p>log in to comment</p>}
              <CommentsList comments={comments} />
            </div>
          </Col>
        </Row>
    </Container>
    </div>

  );
}

export async function articleLoader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { title, content, upvotes, comments, imageId, upvoteIds } = response.data;
  return { title, content, upvotes, comments, imageId, upvoteIds};
}

import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../../CommentsList/CommentsList';
import AddCommentForm from '../../AddCommentForm/AddCommentForm';
import "./ArticlePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ArticlePage( {images} ) {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments:initialComments, title: title, content: content, imageId:imageId} = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const [upvoteImg, setUpvoteImg] = useState("/Like.png")
  const [upVoteStatus, setUpvoteStatus] = useState(0)

  async function onUpvoteClicked() {
    try{
      if (upVoteStatus == 0){
        setUpvoteImg("/Liked.png")
        const response = await axios.post('/api/articles/' + name + '/upvote');
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes);
        setUpvoteStatus(1)
      }
      
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
              {content.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
          </div>
          
          </Col>

          <Col lg={3} sm={12} className='upvote-comment-container'>
          <div className='upvote-button'>
            <span>Like</span>
            <span className='upvote-counter'>{upvotes}</span>
            <img onClick={onUpvoteClicked} className={upVoteStatus == 0 ? "like" : "liked"} width="40px" height="40px" src={upvoteImg}></img>
          </div>

            <div className='comment-container'>
              <h1>Comments</h1>
              <AddCommentForm onAddComment={onAddComment}/>
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
  const { title, content, upvotes, comments, imageId } = response.data;
  return { title, content, upvotes, comments, imageId};
}

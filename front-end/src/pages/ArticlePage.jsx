import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../AddCommentForm';

export default function ArticlePage( {images} ) {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments:initialComments, title: title, content: content, imageId:imageId} = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  async function onUpvoteClicked() {
    try{
      const response = await axios.post('/api/articles/' + name + '/upvote');
      const updatedArticleData = response.data;
      setUpvotes(updatedArticleData.upvotes);
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
    <div className='article-container'>
      <h1>{title}</h1>
      <img src={images[imageId]}/>
      <button onClick={onUpvoteClicked}>Upvote</button>
      <p>This article has {upvotes} upvotes</p>
      {content.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
      <AddCommentForm onAddComment={onAddComment}/>
      <CommentsList comments={comments} />
    </div>
  );
}

export async function articleLoader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { title, content, upvotes, comments, imageId } = response.data;
  return { title, content, upvotes, comments, imageId};
}

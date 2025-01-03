import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../AddCommentForm';

export default function ArticlePage( {imageIdToIMG} ) {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments:initialComments, title: title, content: content, imageId:imageId} = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  async function onUpvoteClicked() {
    const response = await axios.post('/api/articles/' + name + '/upvote');
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function onAddComment( {nameText, commentText}) {
    const response = await axios.post('/api/articles/' + name + '/comments', {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  return (

    <div className='article-container'>
      <h1>{title}</h1>
      <img src={'/' + imageIdToIMG(imageId)}/>
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

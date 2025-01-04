import {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

export default function ChooseImgPage(){
    const {name} = useParams();
    const [imageId, setImageId] = useState('')

    async function onSubmitImgId( {imageId}) {
        const response = await axios.post('/api/writearticle/' + name + '/change-img-id', {
            imageId: imageId,
        });
    }

    return (
        <div>
             <h1>Choose IMG</h1>

             <div>
                <label htmlFor="article-imageId">ImageId</label>
                <textarea autoComplete='on' id='article-imageId' type="number" placeholder="enter image ID" value={imageId} onChange={(e) => setImageId(e.target.value)}></textarea>
            </div>

            <Link to={'/write-article/' + name + '/article-created'}>
                <Button onClick={() => onSubmitImgId( { imageId })} variant='primary'>
                    Next
                </Button>
            </Link>
        </div>
    )
}
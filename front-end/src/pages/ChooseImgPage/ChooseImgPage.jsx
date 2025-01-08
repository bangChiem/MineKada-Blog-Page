import {useState, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

import "./ChooseImgPage.css"

export default function ChooseImgPage( {images} ){
    const {name} = useParams();
    const [imageId, setImageId] = useState(0)

    async function onSubmitImgId( {imageId}) {
        try{
            const response = await axios.post('/api/writearticle/' + name + '/change-img-id', {
                imageId: imageId,
            });
        } catch(err){
            console.error("failed to update articles image id / from choose img page");
            console.error(err);
        }
        
    }

    return (
        <div className='backdrop'>
            <div className='page-container choose-article'>
                <h1>Choose Article Picture</h1>
                <Carousel
                    activeIndex={imageId}
                    onSelect={(selectedIndex) => setImageId(selectedIndex)}
                    interval={null}
                >
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                            loading="lazy"
                            style={{ maxHeight: '1200px', objectFit: 'cover' }}
                        />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <Link to={'/write-article/' + name + '/article-created'}>
                <button onClick={() => onSubmitImgId( { imageId })} variant='primary'>
                    Next
                </button>
                </Link>
            </div>
        
        </div>
    )
}
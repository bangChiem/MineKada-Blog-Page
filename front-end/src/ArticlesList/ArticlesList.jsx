import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import "./ArticlesList.css"


export default function ArticlesList( {articles, images} ){
    
    return(
        <div className='backdrop'>
            <div className="page-container articles-list">
                <div className="row">
                    {articles.slice().reverse().map((a) => (
                        <div key={a.name} className="col-md-4 mb-4 d-flex align-items-stretch">
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={images[a.imageId]} />
                                <Card.Text className="text-muted">{a.date}</Card.Text>
                                <Card.Body className='pt-0'>
                                    <Card.Title>{a.title}</Card.Title>
                                    <Card.Text>{a.content[0].substring(0, 150)}...</Card.Text>
                                    <Link to={'/articles/' + a.name}>
                                        <button variant="primary">Read Article</button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div> 


    )
} 
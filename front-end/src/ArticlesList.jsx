import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function ArticlesList( {articles, imageIdToIMG} ){
    
    return(
        <div className='backdrop'>
            <div className="page-container">
                <div className="row">
                    {articles.map((a) => (
                        <div key={a.name} className="col-md-4 mb-4 d-flex align-items-stretch">
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={imageIdToIMG(a.imageId)} />
                                <Card.Body>
                                    <Card.Title>{a.title}</Card.Title>
                                    <Card.Text>{a.content[0].substring(0, 150)}...</Card.Text>
                                    <Link to={'/articles/' + a.name}>
                                        <button variant="primary">Go somewhere</button>
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
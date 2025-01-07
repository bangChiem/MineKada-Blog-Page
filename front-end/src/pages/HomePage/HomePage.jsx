import "./HomePage.css"
import {Link} from 'react-router-dom';

export default function HomePage() {
    return (
        <div>

            {/* Hero-Banner */}
            <div className="container-fluid hero-container text-white text-center py-5">
                <h2>Welcome to the</h2>
                <h1>MineKada Blog!</h1>
            </div>

            
            
            {/* Right Column (Image) */}
            <div className="container-fluid py-4 px-4 px-sm-5 content-container">
                <div className="row">
                    <div className="col-xl-8 mb-xl-0 mb-3 order-1  image-container">
                        <img src="Home.jpg"></img>
                    </div>

                    {/* Left Column (text-boxes) */}
                    <div class="col-xl-4 order-2 text-box-container">
                        {/* text-box 1 */}
                        <div className="text-box mb-3 mb-xl-5">
                            <h3>Everyone Can Write Articles!</h3>
                            <p>Contribute to the community by writing your own stories.</p>
                            <Link to="/write-article">
                                <button >WRITE ARTICLE</button>
                            </Link>
                        </div>

                        {/* text-box 2 */}
                        <div className="text-box">
                                <h3>Stay Up To Date</h3>
                                <p>Catch up on what has recently happened in the server by reading articles from other members.</p>
                                <Link to="/articles">
                                    <button>READ ARTICLES</button>
                                </Link>
                        </div>
                    </div>
                </div>      
            </div>
        </div>

    );
}


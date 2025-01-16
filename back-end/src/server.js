import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

app.use(express.json());

let db;

async function connectToDB() {
    const uri = 'mongodb://127.0.0.1:27017';
  
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  
    await client.connect();
  
    db = client.db('full-stack-react-db');
}

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    res.json(article);
});

app.get('/api/getarticles', async (req, res) => {
    const articles = await db.collection('articles').find().toArray()
    res.json(articles);
})

app.get('/api/articles/:name/imageid', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    res.json(article);
});

app.post('/api/writearticle', async (req,res) => {
    const { title, content, imageId } = req.body;
    const name = title.toLowerCase().split(" ").join("+");
    const upvotes = 0;
    const comments = [];
    // Generate current date in "YYYY-MM-DD" format
    const today = new Date();
    const date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const newArticle = {
        name, 
        title, 
        content, 
        upvotes, 
        comments, 
        imageId,
        date
    }

    const updatedArticle = await db.collection('articles').insertOne(newArticle);
    res.json(updatedArticle)
});

app.post('/api/writearticle/:name/change-img-id', async (req,res) => {
    const { name } = req.params;
    const { imageId } = req.body;
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $set: { imageId: imageId }
    }, {
        returnDocument: 'after', // Return the updated document
    })

    res.json(200)
});

app.use(async function(req, res, next) {
    const { authtoken } = req.headers;
  
    if (authtoken) {
      const user = await admin.auth().verifyIdToken(authtoken);
      req.user = user;
      next();
    } else {
      res.sendStatus(400);
    }
  });

app.post('/api/articles/:name/upvote', async (req,res) => {

        const { name } = req.params; 
        const { uid } = req.user;
    
        const article = await db.collection('articles').findOne( {name} )
    
        const upVoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upVoteIds.includes(uid);
    
        if (canUpvote){
            const updatedArticle = await db.collection('articles').findOneAndUpdate({ name } , {
                $inc:  {upvotes: 1},
                $push: { upvoteIds: uid },
            }, {
                returnDocument: 'after',
            });
            res.json(updatedArticle);
        } else {
            res.sendStatus(403);
        }
})

app.post('/api/articles/:name/comments', async (req,res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = {postedBy, text};

    const updatedArticle = await db.collection('articles').findOneAndUpdate( {name}, {
        $push: {comments: newComment}
    }, {
        returnDocument: 'after',
    });
    res.json(updatedArticle);
})

async function start() {
    await connectToDB();
    app.listen(8000, function() {
        console.log('server is listening on port 8000');
    });
}

start()
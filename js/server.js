const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/API/mobile_api/web-blogs.php', (req, res) => {
    
    const blogData = {
        blogs: [
            {
                title: "Sample Blog Title 1",
                image: "images/resource/news-01.jpg",
                author: "John Doe",
                authorImage: "images/resource/author-01.jpg",
                date: "August 10, 2024",
                category: "Category 1"
            },
            {
                title: "Sample Blog Title 2",
                image: "images/resource/news-02.jpg",
                author: "Jane Doe",
                authorImage: "images/resource/author-02.jpg",
                date: "August 11, 2024",
                category: "Category 2"
            }
          
        ]
    };
    res.json(blogData);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((req, res) => {
    res.status(404).send('Not Found');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

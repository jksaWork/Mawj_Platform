document.addEventListener('DOMContentLoaded', () => {
    let isLoading = false;
    const maxPages = 2; // Adjust if needed
    const isIndexPage = document.body.classList.contains('index-page'); // Adjust based on your page context

    // Function to fetch all blogs
    function fetchAllBlogs() {
        const fetchPromises = [];
        for (let page = 1; page <= maxPages; page++) {
            fetchPromises.push(
                fetch(`https://mawjplatform.com/API/mobile_api/web-blogs.php?key=2022@mec*app&page=${page}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data && Array.isArray(data.blogs)) {
                            return data.blogs;
                        } else {
                            console.error('Invalid data format:', data);
                            return [];
                        }
                    })
                    .catch(error => {
                        console.error(`Error fetching page ${page}:`, error);
                        return [];
                    })
            );
        }

        return Promise.all(fetchPromises)
            .then(results => {
                // Flatten the array of arrays
                return results.flat();
            });
    }

    function appendBlogs(blogs, container) {
        if (blogs.length === 0) {
            console.warn('No blogs to append');
            return;
        }
        
        console.log('Appending blogs:', blogs);
        blogs.forEach(blog => {
            const imageUrl = isIndexPage ? 
                'https://mawjplatform.com/mec/bp1.jpg' : 
                (blog.n_image ? 
                    (blog.n_image.startsWith('http') ? blog.n_image : `https://mawjplatform.com/mec/${blog.n_image}`) :
                    'images/resource/default-image.jpg');
        
            const authorImageUrl = blog.author_image ? 
                (blog.author_image.startsWith('http') ? blog.author_image : `https://mawjplatform.com/mec/${blog.author_image}`) :
                'images/resource/default-author.jpg';
    
            const blogHTML = `
                <div class="news-block-three">
                    <div class="inner-box">
                        <div class="image">
                            <a href="blogview.html?id=${blog.n_id || ''}">
                                <img src="${imageUrl}" alt="${blog.n_title || 'No Title'}" />
                            </a>
                        </div>
                        <div class="lower-content">
                            <div class="author-info">
                                <span class="author-image">
                                    <img src="${authorImageUrl}" alt="${blog.author_name || ''}" />
                                </span>
                                <span class="date">${blog.n_dated || 'No Date'}</span>
                            </div>
                            <h5><a href="blogview.html?id=${blog.n_id || ''}" class="${isIndexPage ? 'animated-blog-title' : ''}">${blog.n_title || 'No Title'}</a></h5>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', blogHTML);
        });

        // Add animation class if on index page
        if (isIndexPage) {
            const blogTitles = container.querySelectorAll('.news-block-three .lower-content h5');
            blogTitles.forEach(title => {
                title.classList.add('animated-blog-title');
            });
        }
    }

    // Initialize the container
    const blogContainer = document.querySelector('.outer-container .row');
    const indexContainer = document.getElementById('companyContainer');

    if (blogContainer || indexContainer) {
        fetchAllBlogs()
            .then(blogs => {
                if (indexContainer) {
                    appendBlogs(blogs, indexContainer);
                }
                if (blogContainer) {
                    appendBlogs(blogs, blogContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching all blogs:', error);
            });
    }
});

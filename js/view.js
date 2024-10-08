<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    function getBlogId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function fetchBlogById(blogId) {
        console.log(`Fetching blog with ID ${blogId}...`);
        return fetch(`https://mawjplatform.com/API/mobile_api/web-blog-view.php?key=2022@mec*app&id=${blogId}`)
        .then(response => {
            if (response.status === 500) {
                // If the response status is 500, handle the error but parse the JSON
                return response.json();  // Parse the response as JSON
            }
            return response.json();
        })
            
            .then(data => {
                console.log(`Fetched blog with ID ${blogId}:`, data);
                if (data && data.blog && Array.isArray(data.blog) && data.blog.length > 0) {
                    return data.blog[0];  
                } else {
                    console.warn(`Unexpected data format for blog ID ${blogId}:`, data);
                    return null;
                }
            })
            .catch(error => {
                console.log(error);
                console.error(`Error fetching blog with ID ${blogId}:`, error);
                return data.blog[0];
            });
    }

    function displayBlog(blog) {
        if (!blog) {
            console.error('No blog data to display.');
            return;
        }
    
        const blogViewImageLink = document.querySelector('.blogview-image a');
        const blogViewImage = document.querySelector('.blogview-image img');
        const blogViewDate = document.querySelector('.blogview-date');
        const blogViewCategory = document.querySelector('.blogview-category');
        const blogViewTitleLink = document.querySelector('.blogview-lower-content h5 a');
        const blogContent = document.querySelector('.blog-content');
    
     
if (blogViewImageLink) blogViewImageLink.href = '';
if (blogViewImage) blogViewImage.src = '';
if (blogViewDate) blogViewDate.textContent = '';
if (blogViewCategory) blogViewCategory.textContent = '';
if (blogViewTitleLink) blogViewTitleLink.href = '';
if (blogViewTitleLink) blogViewTitleLink.textContent = '';
if (blogContent) blogContent.innerHTML = '';
if (blogViewImageLink && blogViewImage && blogViewDate && blogViewCategory && blogViewTitleLink && blogContent) {
const baseImageUrl = 'https://mawjplatform.com/mec/'; 
blogViewImageLink.href = `blogview.html?id=${blog.n_id || ''}`;
blogViewImage.src = blog.n_image ? `${baseImageUrl}${blog.n_image}` : 'images/resource/default-image.jpg';
blogViewDate.textContent = blog.n_dated || 'No Date';
blogViewTitleLink.href = `blogview.html?id=${blog.n_id || ''}`;
blogViewTitleLink.textContent = blog.n_title || 'No Title';
blogContent.innerHTML = blog.n_detail || 'No Content';
} else {
console.error('One or more blog view elements are missing.');
}
}
    

    function loadBlog() {
        const blogId = getBlogId();
        if (blogId) {
            fetchBlogById(blogId)
                .then(blog => {
                    displayBlog(blog);
                })
                .catch(error => {
                    console.error('Error loading blog:', error);
                });
        } else {
            console.error('No blog ID found in URL.');
        }
    }

    loadBlog();

    
});
=======
document.addEventListener('DOMContentLoaded', () => {
    function getBlogId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function fetchBlogById(blogId) {
        console.log(`Fetching blog with ID ${blogId}...`);
        return fetch(`https://mawjplatform.com/API/mobile_api/web-blog-view.php?key=2022@mec*app&id=${blogId}`)
        .then(response => {
            if (response.status === 500) {
                // If the response status is 500, handle the error but parse the JSON
                return response.json();  // Parse the response as JSON
            }
            return response.json();
        })
            
            .then(data => {
                console.log(`Fetched blog with ID ${blogId}:`, data);
                if (data && data.blog && Array.isArray(data.blog) && data.blog.length > 0) {
                    return data.blog[0];  
                } else {
                    console.warn(`Unexpected data format for blog ID ${blogId}:`, data);
                    return null;
                }
            })
            .catch(error => {
                console.log(error);
                console.error(`Error fetching blog with ID ${blogId}:`, error);
                return data.blog[0];
            });
    }

    function displayBlog(blog) {
        if (!blog) {
            console.error('No blog data to display.');
            return;
        }
    
        const blogViewImageLink = document.querySelector('.blogview-image a');
        const blogViewImage = document.querySelector('.blogview-image img');
        const blogViewDate = document.querySelector('.blogview-date');
        const blogViewCategory = document.querySelector('.blogview-category');
        const blogViewTitleLink = document.querySelector('.blogview-lower-content h5 a');
        const blogContent = document.querySelector('.blog-content');
    
     
if (blogViewImageLink) blogViewImageLink.href = '';
if (blogViewImage) blogViewImage.src = '';
if (blogViewDate) blogViewDate.textContent = '';
if (blogViewCategory) blogViewCategory.textContent = '';
if (blogViewTitleLink) blogViewTitleLink.href = '';
if (blogViewTitleLink) blogViewTitleLink.textContent = '';
if (blogContent) blogContent.innerHTML = '';
if (blogViewImageLink && blogViewImage && blogViewDate && blogViewCategory && blogViewTitleLink && blogContent) {
const baseImageUrl = 'https://mawjplatform.com/mec/'; 
blogViewImageLink.href = `blogview.html?id=${blog.n_id || ''}`;
blogViewImage.src = blog.n_image ? `${baseImageUrl}${blog.n_image}` : 'images/resource/default-image.jpg';
blogViewDate.textContent = blog.n_dated || 'No Date';
blogViewTitleLink.href = `blogview.html?id=${blog.n_id || ''}`;
blogViewTitleLink.textContent = blog.n_title || 'No Title';
blogContent.innerHTML = blog.n_detail || 'No Content';
} else {
console.error('One or more blog view elements are missing.');
}
}
    

    function loadBlog() {
        const blogId = getBlogId();
        if (blogId) {
            fetchBlogById(blogId)
                .then(blog => {
                    displayBlog(blog);
                })
                .catch(error => {
                    console.error('Error loading blog:', error);
                });
        } else {
            console.error('No blog ID found in URL.');
        }
    }

    loadBlog();

    
});
>>>>>>> dd7f35ff432aa9d063afdd0909376ba226a52ed2

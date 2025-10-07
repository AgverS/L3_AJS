const https = require('https');
function fetchWithCallback(url, callback) {
    https.get(url, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                callback(null, parsedData);
            } catch (error) {
                callback(error, null);
            }
        });
        
    }).on('error', (error) => {
        callback(error, null);
    });
}

fetchWithCallback('https://jsonplaceholder.typicode.com/posts', (error, posts) => {
    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }
    
    const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
    console.log('Posts sorted by title length (descending):', sortedPosts);
});

fetchWithCallback('https://jsonplaceholder.typicode.com/comments', (error, comments) => {
    if (error) {
        console.error('Error fetching comments:', error);
        return;
    }
    
    const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Comments sorted by author name:', sortedComments);
});
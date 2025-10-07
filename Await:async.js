function fetchAsync(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
            
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function performAllOperations() {
    try {
        console.log('=== Operations from point A ===');
        
        const posts = await fetchAsync('https://jsonplaceholder.typicode.com/posts');
        const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
        console.log('Posts sorted by title length:', sortedPosts);
        
        const comments = await fetchAsync('https://jsonplaceholder.typicode.com/comments');
        const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log('Comments sorted by author name:', sortedComments);
        
        console.log('\n=== Operations from point B ===');
        
        const users = await fetchAsync('https://jsonplaceholder.typicode.com/users');
        const filteredUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        }));
        console.log('Filtered users:', filteredUsers);
        
        const todos = await fetchAsync('https://jsonplaceholder.typicode.com/todos');
        const filteredTodos = todos.filter(todo => !todo.completed);
        console.log('Todos with completed = false:', filteredTodos);
        
    } catch (error) {
        console.error('Error in async operations:', error);
    }
}

performAllOperations();

function fetchWithPromise(url) {
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

fetchWithPromise('https://jsonplaceholder.typicode.com/users')
    .then(users => {
        const filteredUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        }));
        console.log('Filtered users:', filteredUsers);
        return filteredUsers;
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });

fetchWithPromise('https://jsonplaceholder.typicode.com/todos')
    .then(todos => {
        const filteredTodos = todos.filter(todo => !todo.completed);
        console.log('Todos with completed = false:', filteredTodos);
        return filteredTodos;
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });
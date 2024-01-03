/*
** Custom useFetch hook, making use of the fetch API in an async/await setting.
*/
export default function useFetch (baseUrl) {
    // Getting every entry from the DB.
    const get = async (endpoint) => {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.stack);
        }
    };

    // Posting an entry to the DB.
    const post = async (endpoint, body) => {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            return error.message;
        };
    };

    // Deleting an entry from the DB.
    const remove = async (endpoint) => {
        try {
            console.log(`${baseUrl}${endpoint}`)
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error(error.stack);
        }
    };

    // Updating an entry in the DB.
    const put = async (endpoint, body) => {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.error(error.stack);
            return error;
        }
    }

    // Exporting the functions as part of an object for easier readability later on.
    return { get, post, remove, put };
};
import { TOKEN, MAIN_URL } from './config';

export const api = {
    tasks: {
        create (task) {
            return fetch(`${MAIN_URL}/`, {
                method:   'POST',
                body:    JSON.stringify({message: task }),
                headers: {
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
                }
            );
        },
        remove (id) {
            return fetch(`${MAIN_URL}/${id}`, {
                    method:   'DELETE',
                    headers: {
                        'Authorization': TOKEN,
                    },
                }
            );
        },
        fetch () {
            return fetch(`${MAIN_URL}/`, {
                method:   'GET',
                headers: {
                    'Authorization': TOKEN,
                },
                }
            );
        },
        edit (requestData) {
            return fetch(`${MAIN_URL}/`, {
                    method:   'PUT',
                    body:    JSON.stringify([{...requestData}]),
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json',
                    },
                }
            );
        },
    },
};
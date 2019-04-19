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
    },
};
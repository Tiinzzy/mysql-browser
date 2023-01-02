import axios from 'axios';

class BackEndConnectionImpl {
    async connect(query) {
        return axios.get('/connection-is-ok', { params: query })
            .then(function (response) {
                return response.data.isOK;
            })
            .catch(function (error) {
                return false;
            })
    }
}

export default class BackEndConnection {
    static #object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}


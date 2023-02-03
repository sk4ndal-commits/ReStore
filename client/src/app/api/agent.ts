import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";

// TODO: reformat into Axios-Component, see:
//  https://stackoverflow.com/questions/74085802/what-is-the-correct-way-to-use-usenavigate-inside-axios-interceptor

axios.defaults.baseURL = "http://localhost:5000/api/";

// intercept the server response st if we got an error, we gain access
// to its error response, else just return the response

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {

    // @ts-ignore
    const {data, status} = error.response ? error.response : error;

    // @ts-ignore
    const dataTitle = data.title;

    // @ts-ignore
    const dataErrors = data.errors;

    switch (status) {
        case 400:
            if (dataErrors) {
                const modelStateErrors: string[] = [];

                for (const key in dataErrors) {
                    if (dataErrors[key]) modelStateErrors.push(dataErrors[key])
                }

                throw  modelStateErrors.flat();
            }

            toast.error(dataTitle);
            break;
        case 401:
            toast.error(dataTitle);
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => request.get("products"),
    details: (id: number) => request.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => request.get("buggy/bad-request"),
    get401Error: () => request.get("buggy/unauthorized"),
    get404Error: () => request.get("buggy/not-found"),
    get500Error: () => request.get("buggy/server-error"),
    getValidationError: () => request.get("buggy/validation-error")
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;
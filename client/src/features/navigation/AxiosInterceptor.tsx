import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";



function useAxiosInterception() {
    const navRef = useRef(useNavigate());

    const sleep = () => new Promise(resolve => setTimeout(resolve, 300));

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            async (response) => {
                await sleep();
                return response;
            },
            (error: AxiosError) => {


                // @ts-ignore
                const {data, status} = error.response ? error.response : error;
                const dataTitle = data.title;
                const dataErrors = data.errors;

                switch (status) {
                    case 400: {
                        console.log("caught 400 by interceptor");

                        if (dataErrors) {
                            const modelStateErrors: string[] = []

                            for (const key in dataErrors) {
                                if (dataErrors[key]) modelStateErrors.push(dataErrors[key]);
                            }

                            throw modelStateErrors.flat();
                        }

                        toast.error(dataTitle);
                        break;
                    }
                    case 401: {
                        console.log("caught 401 by interceptor");
                        toast.error(dataTitle);
                        break;
                    }
                    case 404: {
                        console.log("caught 404 by interceptor");
                        navRef.current("not-found");
                        break;
                    }
                    case 500: {
                        console.log("caught 500 by interceptor");
                        navRef.current("server-error");
                        break;
                    }
                    default:
                        break;
                }

                return Promise.reject(error.response);
            }
        )

        return () => {
            axios.interceptors.response.eject(interceptor);
        }
    },[]);
}


export default function AxiosInterceptor() {

    useAxiosInterception();

    return <></>;
}
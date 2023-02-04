import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";



function useAxiosNavigation() {
    const navRef = useRef(useNavigate());

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
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

    useAxiosNavigation();

    return <></>;
}
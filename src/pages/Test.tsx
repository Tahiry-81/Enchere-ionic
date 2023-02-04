import React, {useEffect, useState} from "react";
import axios from "axios";
import { setDefaultHandler } from "workbox-routing";
import { setErrorHandler } from "ionicons/dist/types/stencil-public-runtime";
import { setCacheNameDetails } from "workbox-core";

function Test(url:  any){
    const [temp, setTemp] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
        }, [url]);

        return { data, error }

}
export default Test;


    
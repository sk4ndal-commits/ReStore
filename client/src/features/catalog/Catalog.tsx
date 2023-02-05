import React, {useEffect, useState} from "react";
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingScreen from "../navigation/LoadingScreen";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingScreen />

    return(
        <>
            <ProductList products={products} />
        </>
    )
}
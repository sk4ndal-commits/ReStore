import React, {useEffect, useState} from "react";
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
import axios from "axios";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, []);

    return(
        <>
            <ProductList products={products} />
        </>
    )
}
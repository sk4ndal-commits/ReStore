import React, {useEffect, useState} from 'react';
import {Product} from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {Typography} from "@mui/material";

function App() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then(response => response.json())
            .then(data => setProducts(data))
    }, []);


    function addProduct() {
        setProducts(prevState => [...prevState,
            {
                id: prevState.length+101,
                name: "Product" + prevState.length+1,
                price: (prevState.length+1)*100,
                brand: "Brand" + (prevState.length+1),
                description: "Description" + (prevState.length+1),
                pictureUrl: "http://picsum.photos/200",
            }]);
    }

    return (
        <>
            <Typography variant={"h1"}>Re-Store</Typography>
            <Catalog products={products} addProduct={addProduct}/>
        </>
      );
}

export default App;

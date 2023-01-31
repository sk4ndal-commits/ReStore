import React from "react";
import {Product} from "../../app/models/product";
import {List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Button} from "@mui/material";

interface Props {
    products: Product[];
    addProduct: () => void;
}

export default function Catalog({products, addProduct}: Props){

    return(
        <><Typography variant={"h3"}>Catalog</Typography>
            <List>
                {products.map((product, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={product.pictureUrl}></Avatar>
                        </ListItemAvatar>

                        <ListItemText>
                            {product.name} - {product.price}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button variant={"contained"} onClick={addProduct}>Add Product</Button>
        </>
    )
}
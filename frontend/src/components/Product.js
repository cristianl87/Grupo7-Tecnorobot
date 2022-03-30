import React from 'react';

function Product(props){
    console.log(props);
    return(
        <React.Fragment>
                    <tr>
                        <td><img  src={props.mainImage} alt="Imagen Producto"/></td>
                        <td>{props.name}</td>
                        <td>{props.price}</td>
                        <td>{props.category_id}</td>
                    </tr>
        </React.Fragment>
    )
}
export default Product;
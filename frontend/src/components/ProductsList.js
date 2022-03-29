import { useState, useEffect } from 'react';
import React from 'react';
import Product  from './Product';

function ProductsList(){

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/api/products-2')
        .then(response => response.json())
        .then(data => {
            setProducts(data.products);
        });
    }, []);
    
    return (

        <React.Fragment>
                    <div className="card-header py-3">
                            <h6  className="m-0 font-weight-bold text-gray-800">Panel con el listado de productos</h6>
                        </div>
                        <div className="card-body" id='card' style={{maxHeight:"30rem",overflow:"scroll"}}>
                            <table className="table table-bordered">
                                <thead> 
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Categoría</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product,index)=>{
                                            return  <Product  {...product}  key={index} />
                                        })
                                    }
                                </tbody>
                            </table>
                                
                    </div>
           
        </React.Fragment>
    )
}


export default ProductsList;
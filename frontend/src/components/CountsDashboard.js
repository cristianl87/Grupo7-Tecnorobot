import {useState, useEffect } from 'react';
import React from 'react';
import SmallCard from './SmallCard';

function CountsDashboard(){
    const [getProductsCount, setProductsCount] = useState([]);
    const [getUsersCount, setUsersCount] = useState([]);
    const [getCategoriesCount, setCategoriesCount] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/products')
        .then(response => response.json())
        .then(data => {
            setProductsCount({
                color:   "primary",
                titulo: "Total de productos ",
                valor: data.count,
                icono: "fas fa-film",
            });
        });


    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/api/users')
        .then(response => response.json())
        .then(data => {
            setUsersCount({
                color:   "warning",
                titulo: "Total de usuarios",
                valor: data.users.count,
                icono: "fas fa-user",
            });
        });


    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:4000/api/categories')
    //     .then(response => response.json())
    //     .then(data => {
    //         setProductsCount({
    //             color:   "primary",
    //             titulo: "Total de categorias ",
    //             valor: data.count,
    //             icono: "fas fa-film",
    //         });
    //     });
    // }, []);
    
    const cards = [getProductsCount, getUsersCount];
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cards.map((item,index)=>{
                    return <SmallCard  {...item}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default CountsDashboard;
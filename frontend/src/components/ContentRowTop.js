import React from 'react';
import { useState, useEffect } from 'react';

import ProductsList from './ProductsList';
import CountsDashboard from './CountsDashboard';

function ContentRowTop(){

	const [lastProduct, setLastProduct] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/api/lastProductAdded')
        .then(response => response.json())
        .then(data => {
            setLastProduct(data);
			console.log(data);
        });
    }, []);

    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<CountsDashboard />
					{/*<!-- End movies in Data Base -->*/}
					
	
					{/*<!-- Content Row Last Movie in Data Base -->*/}
					<div className="row">
						{/*<!-- Last Movie in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800"> Último producto creado.</h5>
								</div>
								<div className="card-body ultimoProducto">
									{lastProduct[0].name}
								</div>
							</div>
						</div>
						{/*<!-- End content row last movie in Data Base -->*/}

						

						{/*<!--End Genres In Db-->*/}		
					</div>
					<ProductsList />
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;
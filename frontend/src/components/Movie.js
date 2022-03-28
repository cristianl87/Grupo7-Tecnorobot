import React, {Component} from 'react';

import MovieList from './MovieList';

class Movie extends Component{
	constructor(props) {

		super(props);

		this.state = {
			moviesList: []
		}
	}
	componentDidMount() {
        fetch('http://localhost:3001/api/movies')
        .then(response => response.json())
        .then(movies => {

            this.setState({moviesList: movies.data});
        });
        
    }

	render() {
		return(
			<React.Fragment>
						{/*<!-- PRODUCTS LIST -->*/}
						<h1 className="h3 mb-2 text-gray-800">Panel de categorías con el total de productos de cada una</h1>
						
						{/*<!-- DataTales Example -->*/}
						<div className="card shadow mb-4">
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Titulo</th>
												
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>Id</th>
												<th>Titulo</th>
												
											</tr>
										</tfoot>
										<tbody>
											{
												this.state.moviesList.map((movie,index)=>{
													return  <MovieList  {...movie}  key={index} />
												})
											}
										</tbody>
									</table>
								</div>
							</div>
						</div>            
			</React.Fragment>
		)
	}
    
}
export default Movie;
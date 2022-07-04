// Css
import './Listado.css'
// Librerías
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swAlert from '@sweetalert/with-react';
import axios from 'axios';
// Componentes
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';



const Listado = () => {

    let token = sessionStorage.getItem('token')
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data.results;
                setMoviesList(apiData)
                setLoading(false)
            })
            .catch(err => {
                swAlert(<h5>Error al conectar con la API</h5>);
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h3>Las mejores películas</h3>
                    <section className="total-peliculas">
                        {moviesList.map((movie, i) => {
                            const { title, overview, poster_path, id } = movie;
                            return (
                                <Card key={i} className='peliculas-detalle'>
                                    <Card.Img className='img-detail' variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Text>{overview.substring(0, 200)}...</Card.Text>
                                        <Link to={`/detalle/${id}`}><Button variant="primary">Detalle de película</Button></Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </section>
                </>
    )
}

export default Listado;
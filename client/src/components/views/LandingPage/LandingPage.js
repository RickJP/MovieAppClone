import React, {useEffect, useState } from 'react';
import MainImage from '../Sections/MainImage';
import GridCard from '../GridCard/GridCard';
import {FaCode} from 'react-icons/fa';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import {Typography, Row} from 'antd';
const {Title} = Typography;




function LandingPage() {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en&page=`;

  useEffect(() => {
    fetchMovies(`${endpoint}${currentPage}`)
  }, []);

  const fetchMovies = (url) => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setMovies([...movies, ...res.results])
      setCurrentPage(currentPage + 1)
    });
  }

  const handleLoadMore = () => {
    fetchMovies(`${endpoint}${currentPage}`);
  }


  return (
    <div style={{width: '100%', margin: 0}}>

      {movies[1] && 
         <MainImage image={`${IMAGE_URL}w780/${movies[1].backdrop_path}`} title={`${movies[1].original_title}`} text={`${movies[1].overview}`}/>       
      }
      <div style={{width: '85%', margin: '1rem auto'}}>
        <Title level={2}>Movies By Latest</Title>
        <hr />
        <Row gutter={[16, 16]}>
          {movies && movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id}/>
            </React.Fragment>
          ))}
        </Row>

        <br />
        <div style={{ display:'flex', justifyContent:'center'}}>
          <button onClick={handleLoadMore}>Load More</button>
        </div>


      </div>
    </div>
  );
}

export default LandingPage;

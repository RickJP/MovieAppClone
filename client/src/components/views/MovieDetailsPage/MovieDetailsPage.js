import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import MainImage from '../Sections/MainImage.js';
import {Descriptions, Button, Row} from 'antd';
import GridCard from '../GridCard/GridCard';
import Favourite from './Sections/Favorite';

function MovieDetailsPage(props) {
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  const movieId = props.match.params.movieId;

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((res) => res.json())
          .then((res) => {
            setCast(res.cast);
          });
      });
  }, []);

  const handleActorToggle = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {movie && movie.backdrop_path &&  (
        <MainImage
          image={`${IMAGE_URL}w780/${movie.backdrop_path}`}
          title={`${movie.original_title}`}
          text={`${movie.overview}`}
        />
      )}

      <div style={{width: '85%', margin: '1rem auto'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Favourite
            userFrom={localStorage.getItem('userId')}
            movieId={movieId}
            movieInfo={movie}
          />
        </div>

        <Descriptions title='Movie Info' bordered>
          <Descriptions.Item label='Title'>
            {movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label='release_date'>
            {movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label='revenue'>{movie.revenue}</Descriptions.Item>
          <Descriptions.Item label='runtime'>{movie.runtime}</Descriptions.Item>
          <Descriptions.Item label='vote_average'>
            {movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label='vote_count'>
            {movie.movie_count}
          </Descriptions.Item>
          <Descriptions.Item label='status'>{movie.status}</Descriptions.Item>
          <Descriptions.Item label='popularity'>
            {movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={handleActorToggle}>Toggle Actor View</Button>
        </div>


        {actorToggle && (
          <Row gutter={[16, 16]}>
            {cast &&
              cast.map((cst, index) => (
                <React.Fragment key={index}>
                  {cst.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500/${cst.profile_path}`}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsPage;

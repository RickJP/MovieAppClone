import React, {useEffect, useState}  from 'react'
import axios from '../../../../axios'

import { useSelector } from 'react-redux';

function Favorite(props) {

  const user = useSelector(state => state.user)

  const [favoriteNo, setFavoriteNo] = useState(0)
  const [madeFavorite, setMadeFavorite] = useState(false);
  
  const movieAttributes = {
    userFrom: props.userId,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime
  }

  useEffect(() => {

    axios.post('http://localhost:5000/api/favorite/favoriteNo', movieAttributes)
      .then(res => {
        if (res.data.success) {
          setFavoriteNo(res.data.subscriberNo)
        } else {
          alert('Failed to get favorite no')
        }
      })

      axios.post('http://localhost:5000/api/favorite/madeFavorite', movieAttributes)
        .then(res => {
          console.log('MADE FAVORITE ' +res.data.success)
          if (res.data.success) {
            setMadeFavorite(res.data.subscribed)
          } else {
            alert('Failed to get favorite info')
          }
        })

  }, [])

  const handleFavorite = () => {

    if (user.userData && !user.userData.isAuth) {
      return alert('Please log in first')
    }


    if (madeFavorite) {
        // When already added
        console.log('NOT MADE FAV')

        axios.post('http://localhost:5000/api/favorite/removeFromFavorite', movieAttributes)
        .then(res => {
          if (res.data.success) {
            setFavoriteNo(favoriteNo - 1)
            setMadeFavorite(!madeFavorite)
          } else {
            alert('failed to remove from favorites')
          }
        })
    } else {
      // when not added yet
      console.log('MADE FAV')

      axios.post('http://localhost:5000/api/favorite/addToFavorite', movieAttributes)
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            setFavoriteNo(favoriteNo + 1)
            setMadeFavorite(!madeFavorite)
          } else {
            alert('failed to add to favorites')
          }
        })
    }
  }

  return (
    <div>
      <button onClick={handleFavorite}>{madeFavorite ? ' remove favorite': ' add favorite'} {favoriteNo != 0 ? favoriteNo : null}</button>
    </div>
  )
}

export default Favorite

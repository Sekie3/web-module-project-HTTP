import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddMovieForm = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    genre: '',
    metascore: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/movies', newMovie)
      .then((res) => {
        props.setMovies(res.data);
        navigate('/movies');
      })
      .catch((err) => {
        console.error('Error adding a movie:', err);
      });
  };

  const { title, director, genre, metascore, description } = newMovie;


  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Editing <strong>{newMovie.title}</strong></h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies/${id}`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;

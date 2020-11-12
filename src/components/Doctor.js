import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Doctor = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const { id } = useParams();
  useEffect(() => {
    UserService.getDoctor(id).then(
      response => {
        setLoading(false);
        setContent(response.data);
      },
      error => {
        setLoading(false);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        <img src={content.image} alt={content.name} style={{ width: '200px' }} />
        <p>
          Name:
          {content.name}
        </p>
        <p>
          Qualification:
          {content.qualification}
        </p>
        <p>
          Experience:
          {content.experience}
        </p>
      </header>
    </div>
  );
};

export default Doctor;

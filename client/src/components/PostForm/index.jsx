import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_GAMES } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);
  const { loading, data : gamesData} = useQuery(QUERY_GAMES);


  const [addPost, { error }] = useMutation
  (ADD_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts',
      QUERY_ME,
      'me',
      QUERY_GAMES,
      'getGames'
    ]
  });

  

  const gamesArr = gamesData?.games || [];


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const gamesArray = [];
    const formData = new FormData(event.target);
    const formEntries = formData.entries();
    for (const entry of formEntries){
      
      let { 0 : key, 1 : value} = entry;
      if (key.includes("checkbox")){
        gamesArray.push(value);
      }
    };

    try {
      const { data } = await addPost({
        variables: {
          text,
          title,
          author: Auth.getProfile().data.username,
          games: gamesArray,
        },
      });

      setText('');
      setTitle('');
    } catch (err) {
      if (err) {
        if (error.networkError) {
          console.error("Network error:", error.networkError.result || error.networkError.message);
        } else if (error.graphQLErrors) {
          console.error("GraphQL errors:", error.graphQLErrors.map(err => err.message).join(', '));
        } else {
          console.error("An unknown error occurred:", error.message);
        }
      } else {
        console.error("An error occurred but the error object is undefined.");
      }
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title' && value.length <= 280) {
      setTitle(value);
      // setCharacterCount(value.length);
    }
  };
  const handleTextChange = (event) => {
    const { name, value } = event.target;

    if (name === 'text' && value.length <= 280) {
      setText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>
        <h3>Share a list of games!</h3>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="title"
                placeholder="Enter the title of your list..."
                value={title}
                className="form-input h-1"
                style={{ lineHeight: '1', resize: 'vertical' }}
                onChange={handleTitleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="text"
                placeholder="Type a description for your post..."
                value={text}
                className="form-input h-2"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleTextChange}
              ></textarea>
              <p
                className={`m-0 ${
                characterCount === 280 || error ? 'text-danger' : ''}`}
              >
              Character Count: {characterCount}/280
              </p>
            </div>

            <div className="col-12 col-lg-9">
              <p>Choose your games:</p>
              
              <div className='grid grid-cols-3 gap-4'>
                {gamesArr && gamesArr.map((game, index) => (
                  <div className='flex flex-row justify-between' key={game._id + "_0"}>
                    <div key={game._id + "_1"}>
                      <input type="checkbox" className='btn games-btn btn-info' aria-label={game.title} id={game._id} name={"checkbox-" + index} key={game._id + "_" + index} value={game._id} />
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
              

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;

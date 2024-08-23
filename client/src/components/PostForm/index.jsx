import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = ({games}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  console.log(games)

  const [addPost, { error }] = useMutation
  (ADD_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(text)
    console.log(title)

    try {
      const { data } = await addPost({
        variables: {
          text,
          title,
          author: Auth.getProfile().data.username,
        },
      });

      setText('');
      setTitle('');
    } catch (err) {
      console.error(err);
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
      <h3>What's on your geeky mind?</h3>

      {Auth.loggedIn() ? (
        <>
          
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="title"
                placeholder="Enter the title of your post..."
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
              
              <div>
              {games && games.map((game) => (
                <div key={game._id+"_0"}>
                  <input type="checkbox" id={game.title} name={game.title} key={game._id+"_1"} />
                  <label htmlFor = {game.title} key={game._id+"_2"}>{game.title}</label>
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

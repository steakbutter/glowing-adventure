import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { REMOVE_POST } from '../../utils/mutations';

import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostList =  ({
  posts,
  title,
  user,
  showTitle = true,
  showUsername = true,
  showGames = true,
  myPost = false,
}) => {

  const [removePost, { error }] = useMutation
  (REMOVE_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts',
      QUERY_ME,
      'me'
    ]
  });

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  const handleClick = async (event) => {
    event.preventDefault();
    
    const buttonId = event.target.id.split('_')

    try {
      const { data } = await removePost({
        variables: {
          postId : buttonId[0]
          // userId : buttonId[1],
        },
      });

    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div className='' key={post._id + "_0"}>
            <div key={post._id} className="card lg:card-side min-w-64 mb-4">
              <div className='flex flex-column m-2'>
                {showGames && post.games.map((game) => (
                  <div key={game._id}>
                    <p className='gamedefault bg-info box-border w-80 p-4 m-1'>{game.title}</p>
                  </div>
                ))}
              </div>
              <div className="card-body m-2">
                <Link to={`/posts/${post._id}`}>
                <div className="text-black">
                  <h2>{post.title}</h2>
                  <h4><Link className="text-black" to={`/profiles/${post.author}`}>{post.author}</Link></h4>
                  <h5>{post.createdAt}</h5>
                </div>
                <p className="text-black">{post.text}</p>
                  
                </Link>
              </div>
              
              {myPost && 
              <button className='btn btn-error m-4' type='button' key= {post._id} id = {post._id + "_" + user} onClick={handleClick}>
                Delete Post
              </button>
              }
            </div>
          </div>
        ))}
    </div>
  );
};


export default PostList;

import { Link } from 'react-router-dom';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
  showGames = true,
  myPost = false,
}) => {

  console.log(myPost);

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div className=''>
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
                <div className="text-dark">
                  <h2>{post.title}</h2>
                  <h4><Link to={`/profiles/${post.author}`}>{post.author}</Link></h4>
                  <h5>{post.createdAt}</h5>
                </div>
                <p>{post.text}</p>
                  
                </Link>
              </div>
              
              {myPost && 
              <button className='btn btn-error m-4'>
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

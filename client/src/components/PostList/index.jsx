import { Link } from 'react-router-dom';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
  showGames = true,
}) => {
  
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        <div className="card lg:card-side min-w-64 bg-base-100">
          <div className='container flex flex-column m-2'>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 1</div>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 2</div>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 3</div>
          </div>
          <div className="card-body">
            <h2 className="card-title">Top 10 worst shooter games</h2>
            <p>I hate these games</p>
          </div>
        </div>
        <div className="card lg:card-side min-w-64 bg-base-100">
          <div className='container flex flex-column m-2'>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 1</div>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 2</div>
            <div className='gamedefault bg-info box-border p-4 m-1'>Game 3</div>
          </div>
          <div className="card-body">
            <h2 className="card-title">Top 10 best shooter games</h2>
            <p>I love these games</p>
          </div>
        </div>
      </div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <p> {post.title}</p>
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${post.author}`}
                >
                  {post.author} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.text}</p>
              <div >
                {showGames && post.games.map((game) => (
                  <div key = {game._id}> 
                    <p>{game.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Join the discussion on this post.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;

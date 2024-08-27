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
          </div>
          <div className="card-body">
            <h2 className="card-title">Top 10 worst shooter games</h2>
            <p>I hate these games</p>
          </div>
        </div>
      </div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div className='grid grid-cols-3 gap-4'>
            <div key={post._id} className="card bg-primary mb-3">
              <h4 className="card-header text-light m-3">
                <h2 className='card-title'> {post.title}</h2>
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
                <div>
                  {showGames && post.games.map((game) => (
                    <div key={game._id}>
                      <p className='gamedefault bg-info box-border p-4 m-1'>{game.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                className="btn btn-primary"
                to={`/posts/${post._id}`}
              >
                Comments
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;

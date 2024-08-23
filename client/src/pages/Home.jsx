import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS, QUERY_GAMES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const { loadingGames, gamesData } = useQuery(QUERY_GAMES);
  const posts = data?.posts || [];
  const games = data?.games || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PostForm 
          games={games} 
          />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Some Feed for Post(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

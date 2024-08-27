import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS, QUERY_GAMES } from '../utils/queries';

const Home = () => {
  const { loading : postsLoading, data : postsData } = useQuery(QUERY_POSTS);

  const posts = postsData?.posts || [];

  return (
    <main>
      { <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PostForm 
          />
        </div>
        <div className="mb-3">
          {postsLoading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Browse our posts"
            />
          )}
        </div>
      </div>
      }
    </main>
  );
};

export default Home;

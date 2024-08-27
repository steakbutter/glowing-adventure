import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME, QUERY_GAMES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  // try to not repeat this
  const queryMultiple = (userParam) => {
    
    const games = useQuery(QUERY_GAMES);
    const user = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { username: userParam },
    });
    return [games, user];
  }

  const multipleQueries = queryMultiple(userParam)
// ---------------------------------------------

  const { loading : userLoading, data : userData } = multipleQueries[1];

  const { loading : gameLoading, data : gameData } =  multipleQueries[0];


  const user = userData?.me || userData?.user || {};
  const games = gameData?.games || [];
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (userLoading || gameLoading) {
    return <div>Loading...</div>;
  }


  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {/* <div className="flex avatar placeholder">
          <div className="bg-neutral text-neutral-content w-24 rounded-full">
            <span className="text-3xl">D</span>
          </div>
        </div> */}
          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {userParam ? `${user.username}'s` : 'your'} posts.
          </h2>
          <div className="col-12 col-md-10 mb-5">
            <PostList
              posts={user.posts}
              title={`${user.username}'s posts...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PostForm games={games}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

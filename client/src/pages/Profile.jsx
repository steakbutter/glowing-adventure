import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME, QUERY_GAMES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();



  const { loading: userLoading, data: userData } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });


  const user = userData?.me || userData?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {

    return <Navigate to="/me" />;
  }



  if (userLoading) {
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

    <div className="flex-row justify-center mb-3">
      
        {userParam ? (
        <div>

          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing  {user.username}'s  posts.
          </h2>
          <div className="col-12 col-md-10 mb-5">
            <PostList
              posts={user.posts}
              title={`${user.username}'s posts...`}
              showTitle={false}
              showUsername={false}
              myPost = {false}
            />

          </div>
        </div>
          )
      :( 
        <div>
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing your posts.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
            showTitle={false}
            showUsername={false}
            myPost = {true}
          />
        </div>
      </div>)
        }

    </div>
  );
};

export default Profile;

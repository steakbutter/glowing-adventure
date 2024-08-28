import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-primary p-4">
      <div className="container text-center text-light mb-5">
        <h2>The team in charge of this project!</h2>
        <ul>
          <h4><a className='text-light' href='https://github.com/yordanop'>Yordano Perez</a></h4>
          <h4><a className='text-light' href='https://github.com/steakbutter'>Carlos Gonzales</a></h4>
          <h4><a className='text-light' href='https://github.com/Kahlium'>Karen Gutierrez</a></h4>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import { useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Component
        navigate={navigate}
        params={useParams()}
        {...props}
      />
    );
  };

  return Wrapper;
};

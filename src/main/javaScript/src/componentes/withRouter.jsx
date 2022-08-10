import { useNavigate, useParams} from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Component
        navigate={useNavigate()}
        params={useParams()}
        location={window.location}
        {...props}
      />
    );
  };

  return Wrapper;
};

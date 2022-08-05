import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        params={useParams()}
        {...props}
      />
    );
  };

  return Wrapper;
};

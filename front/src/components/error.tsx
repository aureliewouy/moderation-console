import { ApolloError } from "@apollo/client";

interface ErrorProps {
  error: ApolloError;
  handleSkip: () => void;
}

function Error(props: ErrorProps): JSX.Element {
  const { error, handleSkip } = props;
  return (
    <div className="error">
      <p>{error.message}</p>
      <button onClick={handleSkip}>Reload Page</button>
    </div>
  );
}

export default Error;

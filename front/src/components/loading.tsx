import { ReactComponent as Spinner } from "../medias/loading.svg";

function Loading(): JSX.Element {
  return (
    <div className="spinner">
      <Spinner />
    </div>
  );
}

export default Loading;

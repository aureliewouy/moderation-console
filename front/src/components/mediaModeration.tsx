import { Media } from "../utils/interfaces";
import HTMLReactParser from "html-react-parser";

interface ErrorProps {
  nextMedia: Media;
  handleCensor: () => void;
  handleValidate: () => void;
  handleSkip: () => void;
  errorDisplay?: string;
  setReason: React.Dispatch<string>;
  reason: string;
}

function MediaModeration(props: ErrorProps): JSX.Element {
  const {
    nextMedia,
    reason,
    setReason,
    errorDisplay,
    handleCensor,
    handleValidate,
    handleSkip,
  } = props;
  return (
    <div className="flex">
      <div className="channel">
        <img src={nextMedia.thumbnailURL} alt={nextMedia.category} />
        <h3>Channel name</h3>
        <p>{nextMedia.channel.name}</p>
        <h3>Category</h3>
        <p>{nextMedia.category}</p>
      </div>
      <div className="flex video_section">
        <div className="video">
          {nextMedia.embedURL && (
            <iframe
              title={nextMedia.category}
              src={`${nextMedia.embedURL}?autoplay=1`}
              allowFullScreen
              allow="autoplay"
            ></iframe>
          )}
          <h2>Title</h2>
          <p>{HTMLReactParser(nextMedia.description)}</p>
        </div>
        <div className="mutation flex">
          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          {errorDisplay && (
            <span className="error_display">*{errorDisplay}</span>
          )}
          <div className="btns_mutation">
            <button onClick={handleCensor}>Censor</button>
            <button onClick={handleValidate}>Valid</button>
          </div>
          <button className="skip" onClick={handleSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaModeration;

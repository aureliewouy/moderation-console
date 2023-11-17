import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  MutationFunction,
  FetchResult,
} from "@apollo/client";
import { LOAD_MEDIA } from "../graphql/queries";
import { CENSOR_MEDIA, VALIDATE_MEDIA } from "../graphql/mutations";
import Loading from "./loading";
import Error from "./error";
import {
  CensorResponse,
  Media,
  Moderation,
  Mutation,
  ValidResponse,
} from "../utils/interfaces";

import ModalSuccess from "./modalSuccess";
import MediaModeration from "./mediaModeration";

function DisplayNextMedia(): JSX.Element {
  const { error, loading, data, refetch } = useQuery<Moderation>(LOAD_MEDIA);
  const [nextMedia, setNextMedia] = useState<Media | null>(null);
  const [errorDisplay, setErrorDisplay] = useState<string | undefined>(
    undefined,
  );
  const [reason, setReason] = useState<string>("");
  const [censorMedia] = useMutation(CENSOR_MEDIA);
  const [validateMedia] = useMutation(VALIDATE_MEDIA);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  useEffect(() => {
    const nextTaskMedia = data?.moderation?.nextTask?.media;
    if (nextTaskMedia) {
      setNextMedia(nextTaskMedia ?? null);
    }
  }, [data]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showModalSuccess) {
      timeout = setTimeout(() => {
        setShowModalSuccess(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [showModalSuccess]);

  const handleSkip = () => {
    refetch();
  };
  const handleMutation = (mutationFunction: MutationFunction) => {
    if (!reason) {
      setErrorDisplay("Reason is required.");
      return;
    }
    if (nextMedia) {
      const variablesMutations: Mutation = {
        variables: {
          input: {
            clientMutationId: nextMedia.channel.id,
            id: nextMedia.id,
            reason: reason,
          },
        },
      };

      mutationFunction(variablesMutations)
        .then((response: FetchResult<ValidResponse | CensorResponse>) => {
          setReason("");
          setErrorDisplay(undefined);
          handleSkip();
          setShowModalSuccess(true);
          console.log("Mutation Response: ", response);
        })
        .catch((error: string) => {
          setErrorDisplay(`Mutation Error: ${error}`);
        });
    }
  };

  const handleCensor = () => {
    handleMutation(censorMedia);
  };

  const handleValidate = () => {
    handleMutation(validateMedia);
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} handleSkip={handleSkip} />}
      {!loading && !error && nextMedia && (
        <MediaModeration
          setReason={setReason}
          reason={reason}
          nextMedia={nextMedia}
          handleSkip={handleSkip}
          handleValidate={handleValidate}
          handleCensor={handleCensor}
          errorDisplay={errorDisplay}
        />
      )}
      {showModalSuccess && <ModalSuccess />}
    </div>
  );
}

export default DisplayNextMedia;

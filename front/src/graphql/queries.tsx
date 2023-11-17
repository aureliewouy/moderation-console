import { gql } from "@apollo/client";

export const LOAD_MEDIA = gql`
  query Media {
    moderation {
      nextTask {
        media {
          category
          id
          thumbnailURL
          url
          embedURL
          description
          channel {
            id
            name
            description
          }
        }
      }
    }
  }
`;

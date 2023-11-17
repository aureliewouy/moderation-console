export interface Moderation {
  moderation: {
    nextTask: {
      media: Media;
    };
  };
}

export interface Media {
  category: string;
  thumbnailURL: string;
  url: string;
  id: string;
  embedURL: string;
  channel: Channel;
  description: string;
}

export interface Channel {
  id: string;
  description: string;
  name: string;
}

export interface Mutation {
  variables: {
    input: {
      clientMutationId: string;
      id: string;
      reason: string;
    };
  };
}
export interface ValidResponse {
  data: {
    mediaValid: {
      clientMutationId: string;
      status: string;
    };
  };
}
export interface CensorResponse {
  data: {
    mediaCensor: {
      clientMutationId: string;
      status: string;
    };
  };
}

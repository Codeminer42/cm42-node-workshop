import { TorrentAlreadyExistsError, TorrentError } from "../../errors/index.js";

export const TorrentErrorMapper = {
  toHttpResponse: (error: TorrentError) => {
    if (error instanceof TorrentAlreadyExistsError) {
      return {
        status: 409,
        body: {
          error: {
            code: error.code,
            message: "A torrent with the same hash already exists",
          },
        },
      };
    }

    throw new Error(`Unmapped torrent error: ${error.name}`);
  },
};

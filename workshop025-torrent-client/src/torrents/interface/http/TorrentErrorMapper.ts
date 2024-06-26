import { TorrentStatus } from "../../domain/Torrent.js";
import {
  TorrentAlreadyExistsError,
  TorrentCannotBePausedError,
  TorrentCannotBeResumedError,
  TorrentDoesNotExistError,
  TorrentError,
} from "../../errors/index.js";

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

    if (error instanceof TorrentDoesNotExistError) {
      return {
        status: 404,
        body: {
          error: {
            code: error.code,
            message: "The torrent does not exist",
          },
        },
      };
    }

    if (error instanceof TorrentCannotBePausedError) {
      const errorMessage = (() => {
        if (error.torrentStatus === TorrentStatus.Finished)
          return "A finished torrent cannot be paused";

        if (error.torrentStatus === TorrentStatus.Paused)
          return "The torrent is already paused";

        return "The torrent cannot be paused";
      })();

      return {
        status: 409,
        body: {
          error: {
            code: error.code,
            message: errorMessage,
          },
        },
      };
    }

    if (error instanceof TorrentCannotBeResumedError) {
      const errorMessage = (() => {
        if (error.torrentStatus === TorrentStatus.Finished)
          return "A finished torrent cannot be resumed";

        if (error.torrentStatus === TorrentStatus.Started)
          return "The torrent is not paused to be resumed";

        return "The torrent cannot be resumed";
      })();

      return {
        status: 409,
        body: {
          error: {
            code: error.code,
            message: errorMessage,
          },
        },
      };
    }

    throw new Error(`Unmapped torrent error: ${error.name}`);
  },
};

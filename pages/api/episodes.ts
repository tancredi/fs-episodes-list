import { NextApiHandler } from "next";
import { getFirst, responder } from "src/utils/api";
import type { Episode } from "src/types/episodes";
import type { PaginationData } from "src/types/pagination";
import type { FSApiCharacter, FSApiEpisode } from "src/types/final-space-api";
import { cacheAsyncGetter } from "src/utils/cache";
import { paginate } from "src/utils/pagination";
import axios from "axios";

const HOUR_MS = 1000 * 60 * 60;
const PAGE_SIZE = 10;

export interface GetEpisodesApiResponse {
  episodes: Episode[];
  pagination: PaginationData;
}

const fsApi = axios.create({ baseURL: "https://finalspaceapi.com/api/v0/" });

export const getAllEpisodes = cacheAsyncGetter<Episode[]>(async () => {
  const episodes = (await fsApi.get<FSApiEpisode[]>("episode")).data;
  const characters: Record<string, FSApiCharacter> = (
    await getAllCharacters()
  ).reduce(
    (cur, character) => ({ ...cur, [character.id.toString()]: character }),
    {}
  );

  return episodes.map((episode) => ({
    ...episode,
    characters: episode.characters
      .map((url) => characters[url.split("/").pop() || ""])
      .filter(Boolean),
  }));
}, HOUR_MS);

export const getAllCharacters = cacheAsyncGetter(
  async () => (await fsApi.get<FSApiCharacter[]>("character")).data,
  HOUR_MS
);

const listEpisodes: NextApiHandler<GetEpisodesApiResponse> = async (
  { query },
  res
) => {
  const page = Number(getFirst(query.page) || 0);
  const { success, failure } = responder<GetEpisodesApiResponse>(res);

  if (page < 0) {
    return failure(400, "Page must be a natural number");
  } else if (Number.isNaN(page)) {
    return failure(400, "Page must be a valid number");
  } else if (Math.floor(page) !== page) {
    return failure(400, "Page must be an integer");
  }

  const { entries: episodes, pagination } = paginate(
    await getAllEpisodes(),
    page,
    PAGE_SIZE
  );

  return success({ episodes, pagination });
};

export default listEpisodes;

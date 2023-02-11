import { FSApiCharacter, FSApiEpisode } from "./final-space-api";

export type Episode = Omit<FSApiEpisode, "characters"> & {
  characters: FSApiCharacter[];
};

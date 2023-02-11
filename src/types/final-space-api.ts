export interface FSApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  hair: string;
  alias: string[];
  origin: string;
  abilities: string[];
  img_url: string;
}

export interface FSApiEpisode {
  id: number;
  name: string;
  air_date: string;
  director: string;
  writer: string;
  characters: string[];
  img_url: string;
}

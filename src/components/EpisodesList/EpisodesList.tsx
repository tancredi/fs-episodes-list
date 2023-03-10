import type { FunctionComponent } from "react";
import classNames from "classnames";
import type { Episode } from "src/types/episodes";
import styles from "./EpisodesList.module.css";
import dayjs from "dayjs";

export const EpisodesList: FunctionComponent<{ episodes: Episode[] }> = ({
  episodes,
}) => (
  <ul className={styles.episodes}>
    {episodes.map((episode) => (
      <EpisodeListItem key={episode.id} episode={episode} />
    ))}
  </ul>
);

export const EpisodeListItem: FunctionComponent<{ episode: Episode }> = ({
  episode,
}) => (
  <li className={styles.episode}>
    <img
      src={episode.img_url}
      className={classNames(styles.image, styles["episode-image"])}
      alt={`Image from episode "${episode.name}"`}
    />

    <div className={styles.info}>
      <h3>{episode.name}</h3>
      <h4>
        {dayjs(episode.air_date, "MM/DD/YYYY").format("dddd DD MMMM YYYY")}
      </h4>
    </div>

    <ul className={styles.characters}>
      {episode.characters.map((character) => (
        <CharacterThumbnail character={character} key={character.id} />
      ))}
    </ul>
  </li>
);

export const CharacterThumbnail: FunctionComponent<{
  character: Episode["characters"][number];
}> = ({ character }) => (
  <li className={styles.character} title={character.name}>
    <img
      className={classNames(styles.image, styles["character-image"])}
      src={character.img_url}
      alt={`Picture of ${character.name}`}
    />
  </li>
);

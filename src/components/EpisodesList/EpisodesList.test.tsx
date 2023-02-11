import React from "react";
import { render } from "@testing-library/react";
import { EpisodesList } from "./EpisodesList";
import type { Episode } from "../../types/episodes";

const MOCK_CHARACTER: Episode["characters"][number] = {
  id: 1,
  name: "Jane Foo",
  status: "Alive",
  species: "Human",
  gender: "Male",
  hair: "Blonde",
  alias: ["Janey", "Jaynei"],
  origin: "Earth",
  abilities: ["Foo skill", "Bar skill"],
  img_url: "http://foo.bar/character-image.png",
};

const MOCK_EPISODE: Episode = {
  id: 1,
  name: "Episode foobar",
  air_date: "10/10/2010",
  director: "John Doe",
  writer: "Dan Jane",
  characters: [MOCK_CHARACTER],
  img_url: "http://foo.bar/episode-image.png",
};

describe("Episodes list components", () => {
  it("renders UI correctly", () => {
    expect(
      render(<EpisodesList episodes={[MOCK_EPISODE]} />).asFragment()
    ).toMatchSnapshot();
  });

  it("renders each episode provided", () => {
    const episodes = [
      { ...MOCK_EPISODE, id: 0, name: "Episode foo" },
      { ...MOCK_EPISODE, id: 1, name: "Episode bar" },
    ];
    const { getByText } = render(<EpisodesList episodes={episodes} />);

    getByText("Episode foo");
    getByText("Episode bar");
  });

  it("renders expected episode info", () => {
    const { getByText } = render(<EpisodesList episodes={[MOCK_EPISODE]} />);

    getByText(MOCK_EPISODE.name);
    getByText(MOCK_EPISODE.air_date);
  });

  it("renders the main episodes’ image", () => {
    const image = render(
      <EpisodesList episodes={[MOCK_EPISODE]} />
    ).getByAltText('Image from episode "Episode foobar"');

    expect(image).toHaveAttribute("src", MOCK_EPISODE.img_url);
  });

  it("renders all characters", () => {
    const { getByTitle } = render(
      <EpisodesList
        episodes={[
          {
            ...MOCK_EPISODE,
            characters: [
              { ...MOCK_CHARACTER, id: 0, name: "Jane" },
              { ...MOCK_CHARACTER, id: 1, name: "John" },
            ],
          },
        ]}
      />
    );

    getByTitle("Jane");
    getByTitle("John");
  });

  it("renders each characters’ image", () => {
    const { getByAltText } = render(<EpisodesList episodes={[MOCK_EPISODE]} />);

    expect(getByAltText(`Picture of ${MOCK_CHARACTER.name}`)).toHaveAttribute(
      "src",
      MOCK_CHARACTER.img_url
    );
  });
});

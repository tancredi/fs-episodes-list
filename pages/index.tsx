import type { GetServerSideProps, NextPage } from "next";
import { Episode } from "src/types/episodes";
import { PaginationData } from "src/types/pagination";
import { getApiClient, getFirst } from "src/utils/api";
import { EpisodesList } from "src/components/EpisodesList/EpisodesList";
import { GetEpisodesApiResponse } from "./api/episodes";

type Props = { episodes: Episode[]; pagination: PaginationData };

const LandingPage: NextPage<Props> = ({ episodes }) => {
  return (
    <>
      <EpisodesList episodes={episodes} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { episodes, pagination } = (
    await getApiClient().get<GetEpisodesApiResponse>(
      `episodes?page=${getFirst(query.page) || 0}`
    )
  ).data;

  return { props: { episodes, pagination } };
};

export default LandingPage;

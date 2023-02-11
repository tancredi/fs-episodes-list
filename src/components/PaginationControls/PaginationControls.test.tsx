import React from "react";
import { queryByText, render } from "@testing-library/react";
import type { PaginationData } from "../../types/pagination";
import { PaginationControls } from "./PaginationControls";

const MOCK_PAGINATION: PaginationData = {
  page: 1,
  totalPages: 3,
};

describe("Pagination controls component", () => {
  it("renders UI correctly", () => {
    expect(
      render(
        <PaginationControls baseUrl="/" pagination={MOCK_PAGINATION} />
      ).asFragment()
    ).toMatchSnapshot();
  });

  it.each([
    [0, 3, false, true],
    [1, 3, true, true],
  ])(
    "renders correct links depending on current page and page count page: %s, total pages: %s, shows previous: %s, shows next: %s",
    (page, totalPages, shouldRenderPrevious, shouldRenderNext) => {
      const { queryByText } = render(
        <PaginationControls
          pagination={{ ...MOCK_PAGINATION, page, totalPages }}
          baseUrl="/base"
        />
      );

      const previous = queryByText("Previous", { exact: false });
      const next = queryByText("Next", { exact: false });

      shouldRenderPrevious
        ? expect(previous).toBeInTheDocument()
        : expect(previous).not.toBeInTheDocument();

      previous &&
        expect(previous).toHaveAttribute("href", `/base?page=${page - 1}`);

      shouldRenderNext
        ? expect(next).toBeInTheDocument()
        : expect(next).not.toBeInTheDocument();

      next && expect(next).toHaveAttribute("href", `/base?page=${page + 1}`);
    }
  );
});

import React from "react";
import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout component", () => {
  it("renders UI correctly", () => {
    expect(render(<Layout>Foo bar</Layout>).asFragment()).toMatchSnapshot();
  });

  it("renders `children` prop", () => {
    const children = "foo";

    render(<Layout>{children}</Layout>).getByText(children);
  });

  it("renders a logo with correct alt text", () => {
    expect(render(<Layout />).getByAltText("Final Space logo").tagName).toBe(
      "IMG"
    );
  });
});

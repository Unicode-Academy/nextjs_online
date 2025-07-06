import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PostPage from "./page";
describe("Posts", () => {
  it("renders a heading", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "Learn ReactJS",
          body: "Detail Learn ReactJS",
        },

        {
          id: 2,
          title: "Learn NextJS",
          body: "Detail Learn NextJS",
        },
      ]),
    });

    const ResolvePage = await Promise.resolve(PostPage());
    render(ResolvePage);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toContainHTML("Posts");

    const postTitleList = screen.getAllByTestId("post-title");
    const postTitleMap = postTitleList.map((item) => item.textContent);
    expect(postTitleMap).toEqual(["Learn ReactJS", "Learn NextJS"]);
  });

  it("render posts page unchanged", async () => {
    const ResolvePage = await Promise.resolve(PostPage());
    const { container } = render(ResolvePage);

    expect(container).toMatchSnapshot();
  });
});

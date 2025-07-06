import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Posts from "./Posts";
describe("Posts Component", () => {
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

    render(<Posts />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toContainHTML("Posts");

    // const button = screen.getByRole("button");
    // fireEvent.click(button);

    const loadingText = await screen.findByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    const postTitleList = await screen.findAllByTestId("post-title");
    const postTitleMap = postTitleList.map((item) => item.textContent);
    expect(postTitleMap).toEqual(["Learn ReactJS", "Learn NextJS"]);
  });
});

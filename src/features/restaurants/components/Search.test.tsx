import { render, screen } from "@testing-library/react-native";
import { Search } from "./Search";

describe("Search", () => {
  it("should render the search component", async () => {
    render(<Search />);

    expect(await screen.findByText("search")).toBeTruthy();
  });
});

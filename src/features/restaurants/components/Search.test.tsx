import { render, screen } from "@testing-library/react-native";
import { Search } from "../../../shared/components/Search";

describe("Search", () => {
  it("should render the search component", async () => {
    const searchSpy = jest.fn();
    render(<Search onChangeSearch={searchSpy} />);

    expect(await screen.findByText("search")).toBeTruthy();
  });
});

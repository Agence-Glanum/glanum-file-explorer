import Button from "../components/button/button";
import { render } from "@testing-library/react";

describe("Button", () => {
    test("renders the Button component", () => {
      render(<Button />);
    });
});
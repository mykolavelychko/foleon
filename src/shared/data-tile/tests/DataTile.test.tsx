import { Provider } from "@/components/ui/provider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import DataTile from "../DataTile";

const mockDoc = {
  id: "1",
  name: "Sample Document",
  created_on: "2023-01-01T00:00:00Z",
  modified_on: "2023-01-02T00:00:00Z",
  category: "Report",
  status: "draft",
};

const renderWithChakraProvider = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe("DocumentTile", () => {
  test("renders document name", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    expect(screen.getByText("Sample Document")).toBeInTheDocument();
  });

  test("renders created date", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    expect(screen.getByText("1/1/2023")).toBeInTheDocument();
  });

  test("renders modified date", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    expect(screen.getByText("1/2/2023")).toBeInTheDocument();
  });

  test("renders category", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    expect(screen.getByText("Report")).toBeInTheDocument();
  });

  test("renders status", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    expect(screen.getByText("draft")).toBeInTheDocument();
  });

  test('renders "-" when category is not provided', () => {
    const docWithoutCategory = { ...mockDoc, category: null };
    renderWithChakraProvider(<DataTile data={docWithoutCategory} />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  test("renders correct status color", () => {
    renderWithChakraProvider(<DataTile data={mockDoc} />);
    const statusElement = screen.getByText("draft");
    expect(statusElement).toHaveStyle("color: info");
  });
});

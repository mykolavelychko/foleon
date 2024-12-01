import { Provider } from "@/components/ui/provider";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MockedFunction, vi } from "vitest";
import { AuthProvider, useAuth } from "../../../auth/AuthContext";
import Documents from "../Documents";
import { useDocs } from "../Documents.hooks";

// Mock the useDocs hook
vi.mock("../Documents.hooks");

// Mock the useAuth hook
vi.mock("../../../auth/AuthContext", async () => {
  const actual = await vi.importActual("../../../auth/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

const mockUseDocs = useDocs as MockedFunction<typeof useDocs>;
const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

const mockDocs = {
  _embedded: {
    edition: [
      {
        id: "1",
        name: "Sample Document 1",
        created_on: "2023-01-01T00:00:00Z",
        modified_on: "2023-01-02T00:00:00Z",
        category: "Report",
        status: "draft",
      },
      {
        id: "2",
        name: "Sample Document 2",
        created_on: "2023-01-03T00:00:00Z",
        modified_on: "2023-01-04T00:00:00Z",
        category: "Manual",
        status: "published",
      },
    ],
  },
  total: 2,
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider>
      <AuthProvider>{ui}</AuthProvider>
    </Provider>
  );
};

describe("Documents", () => {
  describe("page status", () => {
    test("renders loading spinner when loading", () => {
      mockUseDocs.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });
      renderWithProviders(<Documents />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders error message when there is an error", async () => {
      mockUseDocs.mockReturnValue({
        data: null,
        loading: false,
        error: "Failed to fetch documents",
      });
      renderWithProviders(<Documents />);
      expect(screen.getByText("Failed to fetch documents")).toBeInTheDocument();
    });

  });

  beforeEach(() => {
    mockUseDocs.mockReturnValue({
      data: mockDocs,
      loading: false,
      error: null,
    });

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      setToken: vi.fn(),
    });

    renderWithProviders(<Documents />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders document list", async () => {
    expect(screen.getByText("Sample Document 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Document 2")).toBeInTheDocument();
  });

  test("renders filters", async () => {
    expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    expect(screen.getByText("All Categories")).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import type { UserResponse } from "../features/auth/types/auth.types";

const user: UserResponse = {
  id: "1",
  email: "trainer@example.com",
  username: "ashketchum",
  firstname: "Ash",
  lastname: "Ketchum",
  role: "user",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("AuthContext", () => {
  it("throws when useAuth is called outside an AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });

  it("exposes the given user as authenticated", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthProvider user={user}>{children}</AuthProvider>
      ),
    });

    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("reports unauthenticated when user is null", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthProvider user={null}>{children}</AuthProvider>
      ),
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});

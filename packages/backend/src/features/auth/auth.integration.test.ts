import { randomUUID } from "node:crypto";
import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import { app } from "../../app";

type FakeUser = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
};

const { users } = vi.hoisted(() => ({ users: [] as FakeUser[] }));

vi.mock("../../lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(
        async ({ where }: { where: { email?: string; id?: string } }) =>
          users.find(
            (u) =>
              (where.email !== undefined && u.email === where.email) ||
              (where.id !== undefined && u.id === where.id),
          ) ?? null,
      ),
      create: vi.fn(
        async ({
          data,
        }: {
          data: Omit<FakeUser, "id" | "role" | "createdAt">;
        }) => {
          const user: FakeUser = {
            id: randomUUID(),
            role: "user",
            createdAt: new Date(),
            ...data,
          };
          users.push(user);
          return user;
        },
      ),
    },
  },
}));

beforeEach(() => {
  users.length = 0;
});

const credentials = {
  email: "trainer@example.com",
  password: "pikachu123",
  username: "ashketchum",
  firstname: "Ash",
  lastname: "Ketchum",
};

describe("auth flow", () => {
  it("supports register -> me -> logout", async () => {
    const agent = request.agent(app);

    const registerRes = await agent
      .post("/api/v1/auth/register")
      .send(credentials);

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.data.email).toBe(credentials.email);
    expect(registerRes.body.data).not.toHaveProperty("passwordHash");
    expect(registerRes.headers["set-cookie"]).toBeDefined();

    const meRes = await agent.get("/api/v1/auth/me");
    expect(meRes.status).toBe(200);
    expect(meRes.body.data.email).toBe(credentials.email);

    const logoutRes = await agent.post("/api/v1/auth/logout");
    expect(logoutRes.status).toBe(200);

    const meAfterLogout = await agent.get("/api/v1/auth/me");
    expect(meAfterLogout.status).toBe(401);
  });

  it("logs in with correct credentials and rejects the wrong password", async () => {
    await request(app).post("/api/v1/auth/register").send(credentials);

    const wrongLogin = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: credentials.email, password: "wrong-password" });
    expect(wrongLogin.status).toBe(401);

    const login = await request(app).post("/api/v1/auth/login").send({
      email: credentials.email,
      password: credentials.password,
    });
    expect(login.status).toBe(200);
    expect(login.body.data).not.toHaveProperty("passwordHash");
  });

  it("rejects registering the same email twice", async () => {
    await request(app).post("/api/v1/auth/register").send(credentials);
    const duplicate = await request(app)
      .post("/api/v1/auth/register")
      .send(credentials);

    expect(duplicate.status).toBe(409);
    expect(duplicate.body.code).toBe("USER_ALREADY_EXISTS");
  });

  it("rejects /me without a session", async () => {
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
  });
});

import { promises as fs } from "node:fs";
import path from "node:path";
import { PlayerProfile } from "./playerTypes";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "players.json");

type StoreShape = {
  players: PlayerProfile[];
};

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    return { players: Array.isArray(parsed.players) ? parsed.players : [] };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code === "ENOENT") return { players: [] };
    throw error;
  }
}

async function writeStore(store: StoreShape): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2) + "\n", "utf8");
}

export async function listPlayers(): Promise<PlayerProfile[]> {
  const store = await readStore();
  return store.players.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createPlayer(input: Omit<PlayerProfile, "id" | "createdAt" | "updatedAt">): Promise<PlayerProfile> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const player: PlayerProfile = { ...input, id, createdAt: now, updatedAt: now };

  const store = await readStore();
  store.players.push(player);
  await writeStore(store);

  return player;
}


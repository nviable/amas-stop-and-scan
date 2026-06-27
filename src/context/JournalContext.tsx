import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface ReflectionEntry {
  id: string;
  caseId: string;
  caseTitle: string;
  mode?: "learn" | "practice";
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  /** Step 0 pre-commitment */
  firstReaction: string;
  firstFeeling: string;
  /** Free-text notes captured along the way, keyed by step */
  notes: Partial<Record<string, string>>;
  /** Multiple-choice selections, keyed by step */
  choices: Partial<Record<string, string[]>>;
  /** Now Reflect */
  finalThought: string;
  changedBy: string;
  nextActions: string[];
  hintsUsed?: Partial<Record<"source" | "content" | "alignment", boolean>>;
  performance?: "good" | "partial" | "needs-work";
  stepScores?: Partial<Record<"source" | "content" | "alignment", "good" | "partial" | "needs-work">>;
  feedbackHeadline?: string;
  feedbackBody?: string;
  feedbackWorkOn?: string[];
}

interface JournalContextValue {
  entries: ReflectionEntry[];
  getEntry: (id: string) => ReflectionEntry | undefined;
  upsertEntry: (entry: ReflectionEntry) => void;
  deleteEntry: (id: string) => void;
  newEntryId: () => string;
}

const STORAGE_KEY = "stopscan.reflections.v1";

const JournalContext = createContext<JournalContextValue | null>(null);

function loadEntries(): ReflectionEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ReflectionEntry[]) : [];
  } catch {
    return [];
  }
}

export function JournalProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ReflectionEntry[]>(() => loadEntries());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // storage may be unavailable (private mode); fail silently
    }
  }, [entries]);

  const upsertEntry = useCallback((entry: ReflectionEntry) => {
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.id === entry.id);
      const stamped = { ...entry, updatedAt: new Date().toISOString() };
      if (idx === -1) return [stamped, ...prev];
      const copy = [...prev];
      copy[idx] = stamped;
      return copy;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEntry = useCallback(
    (id: string) => entries.find((e) => e.id === id),
    [entries]
  );

  const newEntryId = useCallback(
    () =>
      `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    []
  );

  const value = useMemo(
    () => ({ entries, getEntry, upsertEntry, deleteEntry, newEntryId }),
    [entries, getEntry, upsertEntry, deleteEntry, newEntryId]
  );

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}

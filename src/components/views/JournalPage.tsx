import { JournalProvider } from "../../context/JournalContext";
import Journal from "./Journal";

export default function JournalPage({ entryId }: { entryId?: string }) {
  return (
    <JournalProvider>
      <Journal entryId={entryId} />
    </JournalProvider>
  );
}

import { JournalProvider } from "../../context/JournalContext";
import CaseFile from "./CaseFile";

export default function CaseFilePage({ slug }: { slug: string }) {
  return (
    <JournalProvider>
      <CaseFile slug={slug} />
    </JournalProvider>
  );
}

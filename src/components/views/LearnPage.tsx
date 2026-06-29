import { JournalProvider } from "../../context/JournalContext";
import Learn from "./Learn";

export default function LearnPage() {
  return (
    <JournalProvider>
      <Learn />
    </JournalProvider>
  );
}

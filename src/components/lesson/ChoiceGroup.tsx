import type { ChoiceQuestion } from "../../lib/caseTypes";

interface ChoiceGroupProps {
  question: ChoiceQuestion;
  selected: string[];
  onChange: (next: string[]) => void;
  revealed?: boolean;
}

export default function ChoiceGroup({
  question,
  selected,
  onChange,
  revealed = false,
}: ChoiceGroupProps) {
  const toggle = (id: string) => {
    if (question.multi) {
      onChange(
        selected.includes(id)
          ? selected.filter((s) => s !== id)
          : [...selected, id]
      );
    } else {
      onChange([id]);
    }
  };

  return (
    <div>
      <p className="mb-3 font-display text-lg font-bold">{question.prompt}</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {question.options.map((opt) => {
          const isSel = selected.includes(opt.id);
          const showFlag = revealed && opt.flag;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`option ${isSel ? "option-selected" : ""} ${
                showFlag ? "ring-2 ring-content/50" : ""
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span>{opt.label}</span>
                {showFlag && <span className="text-content">⚑</span>}
              </span>
            </button>
          );
        })}
      </div>
      {question.multi && (
        <p className="mt-2 text-xs text-ink/50">Select all that apply.</p>
      )}
    </div>
  );
}

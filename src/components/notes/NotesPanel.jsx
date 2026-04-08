import useLocalStorage from "../../hooks/useLocalStorage";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function NotesPanel({ viewDate }) {
  const monthKey = format(viewDate, "yyyy-MM");
  const [savedNotes, setSavedNotes] = useLocalStorage(
    `calendar-notes-${monthKey}`,
    [],
  );
  const [draftNote, setDraftNote] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setDraftNote("");
    setFeedback("");
  }, [monthKey]);

  const isDirty = draftNote.trim().length > 0;

  const handleSave = () => {
    const content = draftNote.trim();

    if (!content) {
      return;
    }

    const newNote = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: content,
      createdAt: new Date().toISOString(),
    };

    setSavedNotes((currentNotes) => [newNote, ...currentNotes]);
    setDraftNote("");
    setFeedback("Note saved.");
  };

  const handleDelete = (id) => {
    setSavedNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id),
    );
    setFeedback("Note deleted.");
  };

  const maxCount = 500;
  const progress = Math.min((draftNote.length / maxCount) * 100, 100);

  return (
    <aside className="flex min-h-full flex-col rounded-2xl border border-[#d8d2ca] bg-white/90 p-3.5">
      <h3 className="m-0 font-[Fraunces] text-[1.55rem] text-[#1e1b18]">Notes</h3>
      <p className="mt-1 mb-2.5 text-xs text-[#6a5c4f]">
        {format(viewDate, "MMMM yyyy")}
      </p>

      <textarea
        className="w-full min-h-42 resize-y rounded-xl border border-[#d8d2ca] bg-[#fffdf9] px-3 py-2.5 text-sm leading-relaxed text-[#1e1b18] focus:border-[#8dc9c4] focus:outline-none focus:ring-2 focus:ring-[#a5ddd8] md:min-h-48"
        value={draftNote}
        onChange={(e) => setDraftNote(e.target.value)}
        placeholder="Write meeting points, reminders, goals, or anything to track this month..."
      />

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty}
          className="rounded-lg border border-[#0f766e] bg-[#0f766e] px-3 py-1.5 text-sm font-medium text-white transition enabled:hover:bg-[#0b5e58] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Save
        </button>
        <span className="text-xs text-[#7a6a5a]">{feedback}</span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="m-0 text-sm font-semibold uppercase tracking-widest text-[#6a5c4f]">
            Saved Notes
          </h4>
          <span className="text-xs text-[#7a6a5a]">
            {savedNotes.length} saved
          </span>
        </div>

        <div className="space-y-2">
          {savedNotes.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[#d8d2ca] bg-white px-3 py-3 text-sm text-[#8b7d6f]">
              No saved notes yet.
            </p>
          ) : (
            savedNotes.map((note) => (
              <article
                key={note.id}
                className="group flex items-start justify-between gap-3 rounded-xl border border-[#e6ded3] bg-white px-3 py-3 shadow-[0_8px_18px_rgba(73,53,34,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(73,53,34,0.1)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="wrap-break-words text-sm leading-relaxed text-[#1e1b18]">
                    {note.text}
                  </p>
                  <p className="mt-1 text-[0.72rem] text-[#8b7d6f]">
                    {format(new Date(note.createdAt), "MMM d, yyyy • h:mm a")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  aria-label="Delete saved note"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e3d8cb] text-[#8b7d6f] transition hover:border-[#c7b7a2] hover:bg-[#f8f4ee] hover:text-[#5f5143]"
                >
                  ×
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

export default NotesPanel;

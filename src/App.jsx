import { useState, useEffect, useRef } from "react";
import "./App.css";

const STORAGE_KEY = "tasks.v1";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — fail silently,
    // the list still works for the current session.
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// A hand-drawn-feeling strikethrough, drawn fresh (slightly randomized)
// per task so completed items don't all look machine-stamped identically.
function InkStrike({ seed }) {
  const wobble = ((seed % 7) - 3) * 0.6;
  const path = `M2,${10 + wobble} C 30,${6 - wobble} 70,${14 + wobble} 98,${8 - wobble}`;
  return (
    <svg className="ink-strike" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  function addTask(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [
      { id: makeId(), text, done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setDraft("");
    inputRef.current?.focus();
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditDraft(task.text);
  }

  function commitEdit(id) {
    const text = editDraft.trim();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text || t.text } : t))
    );
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  const doneCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div className="page">
      <main className="sheet">
        <header className="masthead">
          <h1>Tasks</h1>
          <p className="dateline">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <form className="add-row" onSubmit={addTask}>
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write something down…"
            aria-label="New task"
            autoFocus
          />
          <button type="submit" disabled={!draft.trim()}>
            Add
          </button>
        </form>

        {totalCount > 0 && (
          <div className="filter-row" role="tablist" aria-label="Filter tasks">
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "filter active" : "filter"}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "active" ? "To do" : "Done"}
              </button>
            ))}
          </div>
        )}

        <ul className="list">
          {visibleTasks.length === 0 && totalCount === 0 && (
            <li className="empty">
              Nothing on the page yet — add the first thing on your mind.
            </li>
          )}
          {visibleTasks.length === 0 && totalCount > 0 && (
            <li className="empty">
              {filter === "done"
                ? "Nothing finished yet."
                : "Nothing left to do — nice work."}
            </li>
          )}
          {visibleTasks.map((task) => (
            <li key={task.id} className={task.done ? "task done" : "task"}>
              <button
                className="check"
                role="checkbox"
                aria-checked={task.done}
                aria-label={task.done ? "Mark as not done" : "Mark as done"}
                onClick={() => toggleTask(task.id)}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <rect x="2" y="2" width="16" height="16" rx="3" className="box" />
                  {task.done && (
                    <path d="M5.5 10.5 L8.5 13.5 L14.5 6.5" className="tick" />
                  )}
                </svg>
              </button>

              {editingId === task.id ? (
                <input
                  ref={editInputRef}
                  className="edit-input"
                  value={editDraft}
                  onChange={(e) => setEditDraft(e.target.value)}
                  onBlur={() => commitEdit(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit(task.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                />
              ) : (
                <span
                  className="text"
                  onDoubleClick={() => startEdit(task)}
                  title="Double-click to edit"
                >
                  {task.text}
                  {task.done && <InkStrike seed={task.id.length + task.text.length} />}
                </span>
              )}

              <span className="meta">{timeAgo(task.createdAt)}</span>

              <button
                className="delete"
                aria-label={`Delete "${task.text}"`}
                onClick={() => deleteTask(task.id)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4 L12 12 M12 4 L4 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {totalCount > 0 && (
          <footer className="tally">
            <span>
              {doneCount} of {totalCount} done
            </span>
            {doneCount > 0 && (
              <button className="clear" onClick={clearCompleted}>
                Clear done
              </button>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}

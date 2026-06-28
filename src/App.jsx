.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 6vh 20px 8vh;
}

.sheet {
  width: 100%;
  max-width: 560px;
}

/* ---------- Masthead ---------- */

.masthead {
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--rule);
}

.masthead h1 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.4rem, 6vw, 3.1rem);
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1;
}

.dateline {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--graphite);
  margin-top: 8px;
}

/* ---------- Add row ---------- */

.add-row {
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
}

.add-row input {
  flex: 1;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
  background: var(--paper-raised);
  border: 1px solid var(--rule);
  border-radius: 10px;
  padding: 13px 16px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.add-row input::placeholder {
  color: var(--graphite-light);
  font-style: italic;
}

.add-row input:focus-visible {
  border-color: var(--sage);
  box-shadow: 0 0 0 3px var(--sage-tint);
}

.add-row button {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  border: none;
  border-radius: 10px;
  padding: 0 22px;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.1s ease;
}

.add-row button:hover:not(:disabled) {
  opacity: 0.85;
}

.add-row button:active:not(:disabled) {
  transform: scale(0.97);
}

.add-row button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.add-row button:focus-visible,
.filter:focus-visible,
.check:focus-visible,
.delete:focus-visible,
.clear:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}

/* ---------- Filter row ---------- */

.filter-row {
  display: flex;
  gap: 4px;
  margin-bottom: 18px;
}

.filter {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--graphite);
  background: none;
  border: none;
  border-radius: 7px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.filter:hover {
  background: var(--paper-raised);
}

.filter.active {
  background: var(--ink);
  color: var(--paper);
}

/* ---------- List ---------- */

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.empty {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--graphite-light);
  font-size: 1.02rem;
  padding: 20px 4px;
}

.task {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--rule-light);
  position: relative;
}

.check {
  flex: none;
  width: 22px;
  height: 22px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.check svg {
  width: 100%;
  height: 100%;
}

.box {
  fill: none;
  stroke: var(--graphite-light);
  stroke-width: 1.6;
  transition: stroke 0.15s ease;
}

.task.done .box {
  stroke: var(--sage);
  fill: var(--sage-tint);
}

.tick {
  fill: none;
  stroke: var(--sage);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.text {
  flex: 1;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
  position: relative;
  cursor: text;
  word-break: break-word;
}

.task.done .text {
  color: var(--graphite-light);
}

.ink-strike {
  position: absolute;
  left: -2%;
  top: 38%;
  width: 104%;
  height: 1.4em;
  pointer-events: none;
}

.ink-strike path {
  fill: none;
  stroke: var(--clay);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.edit-input {
  flex: 1;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
  background: var(--paper-raised);
  border: 1px solid var(--sage);
  border-radius: 6px;
  padding: 4px 8px;
  outline: none;
}

.meta {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--graphite-light);
  white-space: nowrap;
}

.delete {
  flex: none;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease, background 0.15s ease;
}

.task:hover .delete,
.task:focus-within .delete {
  opacity: 1;
}

.delete svg {
  width: 11px;
  height: 11px;
}

.delete path {
  stroke: var(--graphite);
  stroke-width: 1.6;
  stroke-linecap: round;
}

.delete:hover {
  background: var(--clay-tint);
}

.delete:hover path {
  stroke: var(--clay);
}

/* ---------- Tally ---------- */

.tally {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--graphite);
}

.clear {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.03em;
  color: var(--graphite);
  background: none;
  border: none;
  text-decoration: underline;
  text-decoration-color: var(--rule);
  cursor: pointer;
  padding: 2px 4px;
}

.clear:hover {
  color: var(--clay);
  text-decoration-color: var(--clay);
}

/* ---------- Responsive ---------- */

@media (max-width: 480px) {
  .page {
    padding: 5vh 14px 6vh;
  }
  .meta {
    display: none;
  }
}

/* ---------- Reduced motion ---------- */

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

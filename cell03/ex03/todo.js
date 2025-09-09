function setCookie(name, value, days = 365) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

const COOKIE_NAME = "todos_ex03";
let todos = [];

const listEl = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");
const emptyHint = document.getElementById("emptyHint");

function render() {
  listEl.innerHTML = "";
  if (todos.length === 0) {
    emptyHint.hidden = false;
    return;
  }
  emptyHint.hidden = true;

  for (const t of todos) {
    const div = document.createElement("div");
    div.className = "todo";
    div.dataset.id = t.id;
    div.textContent = t.text;
    div.title = "Click to remove";

    div.addEventListener("click", () => {
      if (confirm("Do you want to remove that TO DO?")) {
        todos = todos.filter((x) => x.id !== t.id);
        persist();
        render();
      }
    });

    listEl.insertBefore(div, listEl.firstChild);
  }
}

function persist() {
  setCookie(COOKIE_NAME, JSON.stringify(todos));
}

(function bootstrap() {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (raw) todos = JSON.parse(decodeURIComponent(raw));
  } catch {
    todos = [];
  }
  render();
})();

newBtn.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text === null) return;
  const trimmed = text.trim();
  if (!trimmed) return;

  const todo = {
    id: String(Date.now()) + Math.random().toString(36).slice(2),
    text: trimmed,
  };
  todos.unshift(todo);
  persist();
  render();
});

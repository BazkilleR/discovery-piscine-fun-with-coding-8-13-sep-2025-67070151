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

const $list = $("#ft_list");
const $newBtn = $("#newBtn");
const $emptyHint = $("#emptyHint");

function render() {
  $list.empty();

  if (todos.length === 0) {
    $emptyHint.prop("hidden", false);
    return;
  }
  $emptyHint.prop("hidden", true);

  for (const t of todos) {
    const $item = $("<div/>", {
      class: "todo",
      "data-id": t.id,
      text: t.text,
      title: "Click to remove",
    });
    $list.append($item);
  }
}

function persist() {
  setCookie(COOKIE_NAME, JSON.stringify(todos));
}

function bootstrap() {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (raw) todos = JSON.parse(decodeURIComponent(raw));
  } catch {
    todos = [];
  }
  render();
}

$(function () {
  bootstrap();

  $newBtn.on("click", function () {
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

  $list.on("click", ".todo", function () {
    const id = String($(this).data("id"));
    if (!confirm("Do you want to remove that TO DO?")) return;

    todos = todos.filter((x) => x.id !== id);
    persist();
    render();
  });
});

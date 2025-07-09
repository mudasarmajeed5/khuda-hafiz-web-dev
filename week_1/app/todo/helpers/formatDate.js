export function formatDateTime(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

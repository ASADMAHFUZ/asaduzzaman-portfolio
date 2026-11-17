export default function Toast({ toast }) {
  const { type, message, show } = toast;
  const icon = type === 'success' ? '✓' : '!';

  return (
    <div
      id="toast"
      className={`toast${show ? ' show' : ''}${type ? ` ${type}` : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon">{icon}</span>
      <span className="toast-text">{message}</span>
    </div>
  );
}
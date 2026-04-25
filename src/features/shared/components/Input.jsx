import { useTheme } from "../hooks/useTheme";

export default function Input({ label, value, onChange, placeholder, type = "text" }) {
  const { theme } = useTheme();

  const inputBgColor = theme.isDarkMode ? "#1a1a1e" : "#FEFDFB";
  const inputBorderColor = theme.isDarkMode ? "rgba(211, 166, 37, 0.3)" : "rgba(211, 166, 37, 0.4)";
  const inputFocusBorder = theme.isDarkMode ? "rgba(211, 166, 37, 0.8)" : "rgba(211, 166, 37, 0.6)";

  // Color diferente cuando está vacío
  const emptyInputBgColor = value.trim() === ""
    ? (theme.isDarkMode ? "#2a2a2e" : "#F8F6F0")
    : inputBgColor;

  return (
    <div style={{ marginBottom: "18px", textAlign: "left" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "bold",
            color: theme.colors.text,
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "12px 14px",
          fontSize: "15px",
          borderRadius: "6px",
          border: `2px solid ${inputBorderColor}`,
          width: "100%",
          boxSizing: "border-box",
          background: emptyInputBgColor,
          color: theme.colors.text,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = inputFocusBorder;
          e.target.style.boxShadow = theme.isDarkMode
            ? "inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 12px rgba(211, 166, 37, 0.2)"
            : "inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(211, 166, 37, 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = inputBorderColor;
          e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
      />
    </div>
  );
}

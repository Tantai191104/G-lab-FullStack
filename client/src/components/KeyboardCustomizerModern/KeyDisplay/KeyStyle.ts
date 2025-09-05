// ======================
// 🔹 Helper style (màu cũ)
// ======================
export function getKeyStyle(
  viewMode: "keycap" | "switch",
  keycapColor: string,
  {
    isHighlighted,
    isSelected,
    inGroup,
    inKcGroup,
  }: {
    isHighlighted?: boolean;
    isSelected?: boolean;
    inGroup?: boolean;
    inKcGroup?: boolean;
  }
) {
  if (isHighlighted) {
    return {
      bg: "#f59e0b", // vàng
      border: "#d97706",
      text: "#fff",
      shadow: "0 4px 12px rgba(245,158,11,0.5)",
    };
  }
  if (isSelected) {
    return {
      bg: "#1e40af", // xanh dương
      border: "#2563eb",
      text: "#fff",
      shadow: "0 6px 16px rgba(37,99,235,0.45)",
    };
  }
  if (inGroup) {
    return {
      bg: "#15803d", // xanh lá
      border: "#16a34a",
      text: "#fff",
      shadow: "0 4px 12px rgba(21,128,61,0.4)",
    };
  }
  if (inKcGroup) {
    return {
      bg: "#6b21a8", // tím
      border: "#8b5cf6",
      text: "#fff",
      shadow: "0 4px 12px rgba(139,92,246,0.4)",
    };
  }

  return {
    bg: viewMode === "switch" ? "#fff" : keycapColor,
    border: "#888",
    text: "#1f2937",
    shadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
}

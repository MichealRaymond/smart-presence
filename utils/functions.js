export const embeddingsCheck = (a = [], b = [], tolerance = 0.01) => {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
    return false;
  // compute Euclidean distance
  const distance = Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );

  // smaller distance → more similar faces
  return distance < tolerance;
};

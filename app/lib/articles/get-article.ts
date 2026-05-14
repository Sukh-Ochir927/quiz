export const getArticles = async () => {
  try {
    const response = await fetch("/api/article");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
};

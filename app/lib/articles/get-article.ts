export const getArticles = async () => {
  try {
    const response = await fetch("/api/article");
    console.log(response);

    return response.json();
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }
};

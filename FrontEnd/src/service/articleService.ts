import api from "./api";

export const getArticles = () => {
  return api.get("/articles");
};

export const getArticleById = (id: number) => {
  return api.get(`/articles/${id}`);
};

export const createArticle = (data: any) => {
  return api.post("/articles", data);
};

export const updateArticle = (id: number, data: any) => {
  return api.put(`/articles/${id}`, data);
};

export const deleteArticle = (id: number) => {
  return api.delete(`/articles/${id}`);
};
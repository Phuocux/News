import api from "./api";

// Lấy danh sách: Trả về mảng bài báo
export const getArticles = () => {
  return api.get("/articles").then(res => res.data);
};

// Lấy chi tiết: Trả về 1 object bài báo duy nhất
export const getArticleById = (id: number) => {
  return api.get(`/articles/${id}`).then(res => res.data);
};

// Các hàm khác tương tự để đồng nhất dữ liệu
export const createArticle = (data: any) => {
  return api.post("/articles", data).then(res => res.data);
};

export const updateArticle = (id: number, data: any) => {
  return api.put(`/articles/${id}`, data).then(res => res.data);
};

export const deleteArticle = (id: number) => {
  return api.delete(`/articles/${id}`).then(res => res.data);
};
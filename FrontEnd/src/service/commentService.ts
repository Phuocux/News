import api from "./api";

// Định nghĩa Interface để TypeScript hỗ trợ gợi ý code tốt hơn
export interface CommentCreateDto {
  content: string;
  username: string;
  articleId: number;

}

export interface CommentUpdateDto {
  content: string;
}

export const commentService = {
  // 1. Lấy comment theo ID bài viết
  getByArticleId(articleId: number) {
    return api.get(`/comments/article/${articleId}`);
  },

  // 2. Tạo comment mới
  create(data: CommentCreateDto) {
    return api.post("/comments", data);
  },

  // 3. Cập nhật comment (SỬA)
  // Đường dẫn thường là: PUT /api/comments/{id}
  update(id: number, data: CommentUpdateDto) {
    return api.put(`/comments/${id}`, data);
  },

  // 4. Xóa comment
  // Đường dẫn thường là: DELETE /api/comments/{id}
  delete(id: number) {
    return api.delete(`/comments/${id}`);
  },
};
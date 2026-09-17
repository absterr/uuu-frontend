export interface Comment {
  id: string;
  analysis_id: string;
  user_id: string;
  user_name: string;
  comment: string;
  created_at: string;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface AddCommentResponse {
  comment: Comment;
}

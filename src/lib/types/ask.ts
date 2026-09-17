export interface AskMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

export interface AskQuestionResponse {
  question: string;
  answer: string;
  analysis_id: string;
}

export interface AskHistoryResponse {
  analysis_id: string;
  conversation: AskMessage[];
}

import { User } from "../../auth/model/auth.model";

export interface Notification {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
    user: User;
  }
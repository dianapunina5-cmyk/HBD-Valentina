
export interface InvitationDetails {
  birthdayGirl: string;
  age: number;
  date: string;
  location: string;
  time: string;
  theme: string;
}

export interface PersonalizedMessage {
  content: string;
  loading: boolean;
  error: string | null;
}

export type SkillLevel =
  | "beginner"
  | "lower-intermediate"
  | "intermediate"
  | "upper-intermediate"
  | "advanced"
  | "open";

export type PlayMode = "casual" | "ranked" | "rotation";

export type AvailabilityDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimeWindow = "morning" | "afternoon" | "evening";

export type Availability = {
  days: AvailabilityDay[];
  windows: TimeWindow[];
  notes?: string;
};

export type TournamentPreferences = {
  interested: boolean;
  divisions?: string[];
  notes?: string;
};

export type PlayerProfile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  contact: {
    email: string;
    phone?: string;
  };
  skillLevel: SkillLevel;
  availability: Availability;
  preferredPlayModes: PlayMode[];
  tournament: TournamentPreferences;
};


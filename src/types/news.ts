// Datenmodell für News, Clubs, Sources (TypeScript-Interfaces)

export type Badge = 'Bestätigt' | 'Gut belegt' | 'Gerücht';

export interface Source {
  id: string;
  name: string;
  type: 'offiziell' | 'seriös' | 'blog' | 'social';
  url: string;
  trustLevel: number; // 1-5
}

export interface Club {
  id: string;
  name: string;
  logoUrl: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  trustScore: number;
  badge: Badge;
  club: Club;
  timestamp: string;
  sources: Source[];
  socialEmbed?: string;
  status: Badge;
}

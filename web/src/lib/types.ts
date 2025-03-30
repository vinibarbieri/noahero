export type Status = 'story' | 'live' | 'none' | 'active' | 'inactive' | 'pending';

export interface Company {
  id: string;
  name: string;
  icon?: string;
  href: string;
  status?: Status;
}

export interface MiniApp {
  id: string;
  companyId: string;
  title: string;
  path: string;
  type?: 'company' | 'user' | 'system';
  icon?: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  lastLogin: string;
}
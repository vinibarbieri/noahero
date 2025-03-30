export type Status = 'story' | 'live' | 'none' | 'active' | 'inactive' | 'pending';

export interface CompanyLink {
  url: string;
  text: string;
}

export interface CompanyProduct {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  icon?: string;
  href: string;
  status?: Status;
  slug?: string;
  category?: string;
  bio?: string;
  isVerified?: boolean;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  voucherBalance?: number;
  voucherCurrency?: string;
  links?: CompanyLink[];
  products?: CompanyProduct[];
  address?: string;
  phone?: string;
  workingHours?: string;
  history?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
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
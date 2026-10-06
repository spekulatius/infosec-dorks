export type Severity = 'critical' | 'high' | 'medium' | 'info';

export type MainCategory = 'Surface Discovery' | 'Services' | 'Cloud Services & Online Dev Tools' | 'Custom Saved';

export type SearchEngine = 'google' | 'duckduckgo' | 'bing' | 'yahoo';

export interface DorkItem {
  id: string;
  title: string;
  query: string;
  category: MainCategory;
  subcategory: string;
  description: string;
  tags: string[];
  severity: Severity;
  fileExtensions?: string[];
  remediation?: string;
  isCustom?: boolean;
}

export interface FilterState {
  search: string;
  category: string;
  subcategory: string;
  severity: string;
  extension: string;
  bookmarkedOnly: boolean;
  tag: string;
}

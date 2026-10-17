export type BlogDetailLayout = 'sidebar-left' | 'sidebar-right' | 'three-column'

export type BlogDetailSettings = {
  detailLayout: BlogDetailLayout
  sidebarCtaEnabled: boolean
  sidebarCtaEyebrow: string
  sidebarCtaImageUrl: string
  sidebarCtaTitle: string
  sidebarCtaText: string
  sidebarCtaButtonLabel: string
  sidebarCtaButtonHref: string
  sidebarSecondaryText: string
  sidebarSecondaryButtonLabel: string
  sidebarSecondaryButtonHref: string
  inlineCtaEnabled: boolean
  inlineCtaTitle: string
  inlineCtaText: string
  inlineCtaButtonLabel: string
  inlineCtaButtonHref: string
}

export const DEFAULT_BLOG_DETAIL_SETTINGS: BlogDetailSettings = {
  detailLayout: 'sidebar-left',
  sidebarCtaEnabled: false,
  sidebarCtaEyebrow: 'DGlide Insights',
  sidebarCtaImageUrl: '',
  sidebarCtaTitle: 'Scale Your Operations',
  sidebarCtaText: 'No more guesswork. Get measurable results.',
  sidebarCtaButtonLabel: 'Get a FREE Demo',
  sidebarCtaButtonHref: '/schedule-demo',
  sidebarSecondaryText: 'Explore our field-backed systems.',
  sidebarSecondaryButtonLabel: 'Download Case Study',
  sidebarSecondaryButtonHref: '/contact-us',
  inlineCtaEnabled: true,
  inlineCtaTitle: 'Ready to move from insight to implementation?',
  inlineCtaText: 'Explore our systems for measurable outcomes.',
  inlineCtaButtonLabel: 'Download Case Study',
  inlineCtaButtonHref: '/contact-us',
}

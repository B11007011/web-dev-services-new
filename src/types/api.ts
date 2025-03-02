export interface PageCreateInput {
  title: string
  slug: string
  content: string
  locale: string
}

export interface PageUpdateInput {
  title?: string
  content?: string
  locale?: string
}

export interface ContactCreateInput {
  name: string
  email: string
  message: string
  phone?: string | null
  company?: string | null
}

export interface ApiResponse<T = any> {
  message?: string
  error?: string
  data?: T
} 
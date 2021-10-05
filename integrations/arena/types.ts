export interface AvatarImage {
  thumb: string
  display: string
}

export interface Metadata {
  description?: any
}

export interface ArenaUser {
  id: number
  created_at: Date
  slug: string
  username: string
  first_name: string
  last_name: string
  full_name: string
  avatar: string
  avatar_image: AvatarImage
  channel_count: number
  following_count: number
  profile_id: number
  follower_count: number
  initials: string
  can_index: boolean
  metadata: Metadata
  is_premium: boolean
  is_lifetime_premium: boolean
  is_supporter: boolean
  is_exceeding_connections_limit: boolean
  is_confirmed: boolean
  is_pending_reconfirmation: boolean
  is_pending_confirmation: boolean
  badge: string
  base_class: string
  class: string
}

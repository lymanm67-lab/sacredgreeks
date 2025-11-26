export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_key: string
          achievement_type: string
          created_at: string
          description: string
          icon: string
          id: string
          points_required: number
          title: string
        }
        Insert: {
          achievement_key: string
          achievement_type: string
          created_at?: string
          description: string
          icon: string
          id?: string
          points_required: number
          title: string
        }
        Update: {
          achievement_key?: string
          achievement_type?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          points_required?: number
          title?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_category: string
          event_data: Json | null
          event_type: string
          id: string
          page_path: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category: string
          event_data?: Json | null
          event_type: string
          id?: string
          page_path?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          page_path?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      assessment_submissions: {
        Row: {
          answers_json: Json
          consent_to_contact: boolean
          created_at: string
          email: string | null
          id: string
          result_type: string
          scenario: string
          scores_json: Json
          track: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          answers_json?: Json
          consent_to_contact?: boolean
          created_at?: string
          email?: string | null
          id?: string
          result_type: string
          scenario: string
          scores_json?: Json
          track: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          answers_json?: Json
          consent_to_contact?: boolean
          created_at?: string
          email?: string | null
          id?: string
          result_type?: string
          scenario?: string
          scores_json?: Json
          track?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          bookmark_type: string
          content_json: Json
          created_at: string | null
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          bookmark_type: string
          content_json: Json
          created_at?: string | null
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          bookmark_type?: string
          content_json?: Json
          created_at?: string | null
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chapter_meeting_notes: {
        Row: {
          action_items: string | null
          attendees: string | null
          created_at: string
          id: string
          meeting_date: string
          notes: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_items?: string | null
          attendees?: string | null
          created_at?: string
          id?: string
          meeting_date: string
          notes?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_items?: string | null
          attendees?: string | null
          created_at?: string
          id?: string
          meeting_date?: string
          notes?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_service_items: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          description: string | null
          event_date: string | null
          hours: number | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          hours?: number | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          hours?: number | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          challenge_type: string
          created_at: string
          date: string
          description: string
          icon: string
          id: string
          points_reward: number
          requirements_json: Json
          title: string
        }
        Insert: {
          challenge_type: string
          created_at?: string
          date: string
          description: string
          icon?: string
          id?: string
          points_reward?: number
          requirements_json?: Json
          title: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          date?: string
          description?: string
          icon?: string
          id?: string
          points_reward?: number
          requirements_json?: Json
          title?: string
        }
        Relationships: []
      }
      daily_devotionals: {
        Row: {
          application: string
          created_at: string | null
          date: string
          id: string
          prayer: string
          proof_focus: string
          reflection: string
          scripture_ref: string
          scripture_text: string
          title: string
        }
        Insert: {
          application: string
          created_at?: string | null
          date: string
          id?: string
          prayer: string
          proof_focus: string
          reflection: string
          scripture_ref: string
          scripture_text: string
          title: string
        }
        Update: {
          application?: string
          created_at?: string | null
          date?: string
          id?: string
          prayer?: string
          proof_focus?: string
          reflection?: string
          scripture_ref?: string
          scripture_text?: string
          title?: string
        }
        Relationships: []
      }
      daily_verses: {
        Row: {
          created_at: string
          date: string
          id: string
          image_url: string | null
          reflection: string | null
          theme: string
          verse_ref: string
          verse_text: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          image_url?: string | null
          reflection?: string | null
          theme: string
          verse_ref: string
          verse_text: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          image_url?: string | null
          reflection?: string | null
          theme?: string
          verse_ref?: string
          verse_text?: string
        }
        Relationships: []
      }
      prayer_journal: {
        Row: {
          answered: boolean | null
          answered_at: string | null
          content: string | null
          created_at: string | null
          id: string
          prayer_type: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          answered?: boolean | null
          answered_at?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          prayer_type?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          answered?: boolean | null
          answered_at?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          prayer_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prayer_request_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          prayer_request_id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          prayer_request_id: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          prayer_request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_request_comments_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          answered: boolean | null
          answered_at: string | null
          answered_testimony: string | null
          created_at: string
          description: string | null
          id: string
          prayer_count: number | null
          privacy_level: string
          request_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answered?: boolean | null
          answered_at?: string | null
          answered_testimony?: string | null
          created_at?: string
          description?: string | null
          id?: string
          prayer_count?: number | null
          privacy_level?: string
          request_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answered?: boolean | null
          answered_at?: string | null
          answered_testimony?: string | null
          created_at?: string
          description?: string | null
          id?: string
          prayer_count?: number | null
          privacy_level?: string
          request_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prayer_support: {
        Row: {
          encouragement_note: string | null
          id: string
          prayed_at: string
          prayer_request_id: string
          user_id: string
        }
        Insert: {
          encouragement_note?: string | null
          id?: string
          prayed_at?: string
          prayer_request_id: string
          user_id: string
        }
        Update: {
          encouragement_note?: string | null
          id?: string
          prayed_at?: string
          prayer_request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_support_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          devotional_reminders: boolean
          endpoint: string
          id: string
          p256dh_key: string
          prayer_reminder_schedule: string | null
          prayer_reminders: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          devotional_reminders?: boolean
          endpoint: string
          id?: string
          p256dh_key: string
          prayer_reminder_schedule?: string | null
          prayer_reminders?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          devotional_reminders?: boolean
          endpoint?: string
          id?: string
          p256dh_key?: string
          prayer_reminder_schedule?: string | null
          prayer_reminders?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      resource_suggestions: {
        Row: {
          admin_notes: string | null
          category: string
          created_at: string
          description: string
          id: string
          resource_type: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          resource_type: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          resource_type?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_bible_searches: {
        Row: {
          created_at: string
          id: string
          results_json: Json
          search_query: string
          search_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          results_json: Json
          search_query: string
          search_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          results_json?: Json
          search_query?: string
          search_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_results: {
        Row: {
          assessment_id: string
          created_at: string
          expires_at: string | null
          id: string
          last_viewed_at: string | null
          share_token: string
          shared_by: string
          view_count: number
        }
        Insert: {
          assessment_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          last_viewed_at?: string | null
          share_token: string
          shared_by: string
          view_count?: number
        }
        Update: {
          assessment_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          last_viewed_at?: string | null
          share_token?: string
          shared_by?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "shared_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      study_session_progress: {
        Row: {
          completed: boolean
          completed_at: string
          created_at: string
          id: string
          notes: string | null
          session_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string
          created_at?: string
          id?: string
          notes?: string | null
          session_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string
          created_at?: string
          id?: string
          notes?: string | null
          session_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved: boolean
          content: string
          created_at: string
          featured: boolean
          id: string
          organization: string | null
          role: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved?: boolean
          content: string
          created_at?: string
          featured?: boolean
          id?: string
          organization?: string | null
          role: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved?: boolean
          content?: string
          created_at?: string
          featured?: boolean
          id?: string
          organization?: string | null
          role?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_check_ins: {
        Row: {
          challenges_completed: Json | null
          created_at: string
          date: string
          grateful_for: string | null
          id: string
          prayed_today: boolean | null
          quick_reflection: string | null
          read_bible: boolean | null
          served_others: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          challenges_completed?: Json | null
          created_at?: string
          date: string
          grateful_for?: string | null
          id?: string
          prayed_today?: boolean | null
          quick_reflection?: string | null
          read_bible?: boolean | null
          served_others?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          challenges_completed?: Json | null
          created_at?: string
          date?: string
          grateful_for?: string | null
          id?: string
          prayed_today?: boolean | null
          quick_reflection?: string | null
          read_bible?: boolean | null
          served_others?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_gamification: {
        Row: {
          created_at: string
          current_level: number
          id: string
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_level?: number
          id?: string
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_level?: number
          id?: string
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          assessments_count: number | null
          created_at: string | null
          date: string
          devotional_completed: boolean | null
          devotional_notes: string | null
          id: string
          journal_entries_count: number | null
          user_id: string
        }
        Insert: {
          assessments_count?: number | null
          created_at?: string | null
          date: string
          devotional_completed?: boolean | null
          devotional_notes?: string | null
          id?: string
          journal_entries_count?: number | null
          user_id: string
        }
        Update: {
          assessments_count?: number | null
          created_at?: string | null
          date?: string
          devotional_completed?: boolean | null
          devotional_notes?: string | null
          id?: string
          journal_entries_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_points: {
        Args: { _action_type: string; _points: number; _user_id: string }
        Returns: Json
      }
      calculate_level: { Args: { points: number }; Returns: number }
      can_view_shared_result: {
        Args: { _share_token: string }
        Returns: boolean
      }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

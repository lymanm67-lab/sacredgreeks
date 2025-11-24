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
      user_progress: {
        Row: {
          assessments_count: number | null
          created_at: string | null
          date: string
          devotional_completed: boolean | null
          id: string
          journal_entries_count: number | null
          user_id: string
        }
        Insert: {
          assessments_count?: number | null
          created_at?: string | null
          date: string
          devotional_completed?: boolean | null
          id?: string
          journal_entries_count?: number | null
          user_id: string
        }
        Update: {
          assessments_count?: number | null
          created_at?: string | null
          date?: string
          devotional_completed?: boolean | null
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

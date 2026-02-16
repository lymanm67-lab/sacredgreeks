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
          greek_council: string | null
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
          greek_council?: string | null
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
          greek_council?: string | null
          icon?: string
          id?: string
          points_required?: number
          title?: string
        }
        Relationships: []
      }
      ai_chat_conversations: {
        Row: {
          created_at: string
          id: string
          messages_json: Json
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages_json?: Json
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages_json?: Json
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_study_plan_progress: {
        Row: {
          completed_at: string | null
          completed_days: number[] | null
          created_at: string
          current_day: number
          id: string
          last_activity_at: string | null
          plan_id: string
          started_at: string
          streak_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_days?: number[] | null
          created_at?: string
          current_day?: number
          id?: string
          last_activity_at?: string | null
          plan_id: string
          started_at?: string
          streak_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_days?: number[] | null
          created_at?: string
          current_day?: number
          id?: string
          last_activity_at?: string | null
          plan_id?: string
          started_at?: string
          streak_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_study_plan_progress_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "ai_study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_study_plans: {
        Row: {
          created_at: string
          days_json: Json
          description: string | null
          id: string
          is_active: boolean
          plan_type: string
          proof_categories: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_json?: Json
          description?: string | null
          id?: string
          is_active?: boolean
          plan_type: string
          proof_categories?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_json?: Json
          description?: string | null
          id?: string
          is_active?: boolean
          plan_type?: string
          proof_categories?: string[] | null
          title?: string
          updated_at?: string
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
      beta_feedback: {
        Row: {
          admin_notes: string | null
          created_at: string
          description: string
          feedback_type: string
          id: string
          page_context: string | null
          rating: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          description: string
          feedback_type: string
          id?: string
          page_context?: string | null
          rating?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          description?: string
          feedback_type?: string
          id?: string
          page_context?: string | null
          rating?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      beta_testers: {
        Row: {
          beta_code: string | null
          created_at: string
          feedback_count: number
          id: string
          onboarding_completed: boolean
          onboarding_completed_at: string | null
          referred_by: string | null
          signup_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          beta_code?: string | null
          created_at?: string
          feedback_count?: number
          id?: string
          onboarding_completed?: boolean
          onboarding_completed_at?: string | null
          referred_by?: string | null
          signup_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          beta_code?: string | null
          created_at?: string
          feedback_count?: number
          id?: string
          onboarding_completed?: boolean
          onboarding_completed_at?: string | null
          referred_by?: string | null
          signup_date?: string
          status?: string
          updated_at?: string
          user_id?: string
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
      chapter_budgets: {
        Row: {
          budget_amount: number
          category_id: string
          created_at: string | null
          id: string
          notes: string | null
          period_end: string
          period_start: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_amount?: number
          category_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          period_end: string
          period_start: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_amount?: number
          category_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          period_end?: string
          period_start?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_budgets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          category_id: string | null
          created_at: string | null
          description: string | null
          event_name: string | null
          expense_date: string
          id: string
          is_reimbursement: boolean | null
          payment_method: string | null
          receipt_data: Json | null
          receipt_url: string | null
          reimbursement_paid: boolean | null
          reimbursement_paid_at: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["expense_status"] | null
          submitted_by: string | null
          updated_at: string | null
          user_id: string
          vendor_name: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          event_name?: string | null
          expense_date?: string
          id?: string
          is_reimbursement?: boolean | null
          payment_method?: string | null
          receipt_data?: Json | null
          receipt_url?: string | null
          reimbursement_paid?: boolean | null
          reimbursement_paid_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          submitted_by?: string | null
          updated_at?: string | null
          user_id: string
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          event_name?: string | null
          expense_date?: string
          id?: string
          is_reimbursement?: boolean | null
          payment_method?: string | null
          receipt_data?: Json | null
          receipt_url?: string | null
          reimbursement_paid?: boolean | null
          reimbursement_paid_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          submitted_by?: string | null
          updated_at?: string | null
          user_id?: string
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
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
      coaching_waitlist: {
        Row: {
          created_at: string
          email: string
          full_name: string
          goals: string | null
          id: string
          organization: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          goals?: string | null
          id?: string
          organization?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          goals?: string | null
          id?: string
          organization?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
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
      content_drafts: {
        Row: {
          ai_model: string | null
          content: string
          content_type: string
          created_at: string
          editor_notes: string | null
          excerpt: string | null
          generation_prompt: string | null
          hashtags: string[] | null
          id: string
          instagram_caption: string | null
          internal_links: string[] | null
          keywords: string[] | null
          meta_description: string | null
          published_at: string | null
          seo_title: string | null
          slug: string | null
          status: string
          title: string
          twitter_caption: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          content: string
          content_type: string
          created_at?: string
          editor_notes?: string | null
          excerpt?: string | null
          generation_prompt?: string | null
          hashtags?: string[] | null
          id?: string
          instagram_caption?: string | null
          internal_links?: string[] | null
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          seo_title?: string | null
          slug?: string | null
          status?: string
          title: string
          twitter_caption?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_model?: string | null
          content?: string
          content_type?: string
          created_at?: string
          editor_notes?: string | null
          excerpt?: string | null
          generation_prompt?: string | null
          hashtags?: string[] | null
          id?: string
          instagram_caption?: string | null
          internal_links?: string[] | null
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          seo_title?: string | null
          slug?: string | null
          status?: string
          title?: string
          twitter_caption?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversation_scripts: {
        Row: {
          audience_type: string
          boundary_statements: string[]
          closing_prayer: string | null
          created_at: string
          id: string
          is_active: boolean
          key_points: string[]
          opening_lines: string
          questions_to_ask: string[]
          scenario: string
          source_ids: string[] | null
          updated_at: string
        }
        Insert: {
          audience_type: string
          boundary_statements?: string[]
          closing_prayer?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key_points?: string[]
          opening_lines: string
          questions_to_ask?: string[]
          scenario: string
          source_ids?: string[] | null
          updated_at?: string
        }
        Update: {
          audience_type?: string
          boundary_statements?: string[]
          closing_prayer?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key_points?: string[]
          opening_lines?: string
          questions_to_ask?: string[]
          scenario?: string
          source_ids?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      d9_business_directory: {
        Row: {
          business_category: string
          business_name: string
          created_at: string
          description: string
          email: string | null
          faith_statement: string | null
          featured: boolean | null
          greek_organization: string
          id: string
          is_active: boolean | null
          location_city: string | null
          location_state: string | null
          logo_url: string | null
          owner_name: string
          phone: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          business_category: string
          business_name: string
          created_at?: string
          description: string
          email?: string | null
          faith_statement?: string | null
          featured?: boolean | null
          greek_organization: string
          id?: string
          is_active?: boolean | null
          location_city?: string | null
          location_state?: string | null
          logo_url?: string | null
          owner_name: string
          phone?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          business_category?: string
          business_name?: string
          created_at?: string
          description?: string
          email?: string | null
          faith_statement?: string | null
          featured?: boolean | null
          greek_organization?: string
          id?: string
          is_active?: boolean | null
          location_city?: string | null
          location_state?: string | null
          logo_url?: string | null
          owner_name?: string
          phone?: string | null
          updated_at?: string
          website_url?: string | null
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
      earned_certificates: {
        Row: {
          certificate_data: Json | null
          certificate_type: string
          created_at: string
          description: string | null
          earned_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          certificate_data?: Json | null
          certificate_type: string
          created_at?: string
          description?: string | null
          earned_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          certificate_data?: Json | null
          certificate_type?: string
          created_at?: string
          description?: string | null
          earned_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      email_automation_workflows: {
        Row: {
          created_at: string
          delay_hours: number
          email_template_key: string
          id: string
          is_active: boolean
          name: string
          subject_variant_type: string
          trigger_segment: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          delay_hours?: number
          email_template_key: string
          id?: string
          is_active?: boolean
          name: string
          subject_variant_type?: string
          trigger_segment: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          delay_hours?: number
          email_template_key?: string
          id?: string
          is_active?: boolean
          name?: string
          subject_variant_type?: string
          trigger_segment?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          name: string
          started_at: string | null
          status: string
          template_key: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          name: string
          started_at?: string | null
          status?: string
          template_key: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          name?: string
          started_at?: string | null
          status?: string
          template_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_clicks: {
        Row: {
          clicked_at: string
          id: string
          ip_address: string | null
          link_label: string | null
          link_url: string
          send_id: string
          user_agent: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          link_label?: string | null
          link_url: string
          send_id: string
          user_agent?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          link_label?: string | null
          link_url?: string
          send_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_clicks_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "email_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_clicks_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "email_sends_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      email_opens: {
        Row: {
          id: string
          ip_address: string | null
          opened_at: string
          send_id: string
          user_agent: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          opened_at?: string
          send_id: string
          user_agent?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          opened_at?: string
          send_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_opens_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "email_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_opens_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "email_sends_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sends: {
        Row: {
          campaign_id: string
          id: string
          recipient_email: string
          sent_at: string
          tracking_token: string
          user_id: string | null
          variant_id: string
        }
        Insert: {
          campaign_id: string
          id?: string
          recipient_email: string
          sent_at?: string
          tracking_token?: string
          user_id?: string | null
          variant_id: string
        }
        Update: {
          campaign_id?: string
          id?: string
          recipient_email?: string
          sent_at?: string
          tracking_token?: string
          user_id?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "email_subject_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      email_subject_variants: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          preview_text: string | null
          subject_line: string
          variant_type: string
          weight: number
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          preview_text?: string | null
          subject_line: string
          variant_type: string
          weight?: number
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          preview_text?: string | null
          subject_line?: string
          variant_type?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_subject_variants_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      event_rsvps: {
        Row: {
          created_at: string
          event_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "greek_events"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_approval_history: {
        Row: {
          action: string
          action_by: string | null
          created_at: string | null
          expense_id: string
          id: string
          new_status: Database["public"]["Enums"]["expense_status"] | null
          notes: string | null
          previous_status: Database["public"]["Enums"]["expense_status"] | null
        }
        Insert: {
          action: string
          action_by?: string | null
          created_at?: string | null
          expense_id: string
          id?: string
          new_status?: Database["public"]["Enums"]["expense_status"] | null
          notes?: string | null
          previous_status?: Database["public"]["Enums"]["expense_status"] | null
        }
        Update: {
          action?: string
          action_by?: string | null
          created_at?: string | null
          expense_id?: string
          id?: string
          new_status?: Database["public"]["Enums"]["expense_status"] | null
          notes?: string | null
          previous_status?: Database["public"]["Enums"]["expense_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_approval_history_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "chapter_expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          category_type:
            | Database["public"]["Enums"]["expense_category_type"]
            | null
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_type?:
            | Database["public"]["Enums"]["expense_category_type"]
            | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_type?:
            | Database["public"]["Enums"]["expense_category_type"]
            | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      feature_preferences: {
        Row: {
          created_at: string
          feature_id: string
          id: string
          is_visible: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feature_id: string
          id?: string
          is_visible?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feature_id?: string
          id?: string
          is_visible?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_discussions: {
        Row: {
          category: string
          content: string
          created_at: string
          greek_council: string | null
          greek_organization: string | null
          id: string
          is_pinned: boolean | null
          reply_count: number | null
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          greek_council?: string | null
          greek_organization?: string | null
          id?: string
          is_pinned?: boolean | null
          reply_count?: number | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          greek_council?: string | null
          greek_organization?: string | null
          id?: string
          is_pinned?: boolean | null
          reply_count?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
      forum_notifications: {
        Row: {
          created_at: string
          discussion_id: string | null
          id: string
          is_read: boolean | null
          message: string
          notification_type: string
          reply_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          notification_type: string
          reply_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          notification_type?: string
          reply_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_notifications_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "forum_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_notifications_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          discussion_id: string
          id: string
          is_best_answer: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          is_best_answer?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          is_best_answer?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "forum_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      founding_members: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          organization: string | null
          referral_code: string
          referral_count: number | null
          referred_by_code: string | null
          signed_up_at: string | null
          tier: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          organization?: string | null
          referral_code: string
          referral_count?: number | null
          referred_by_code?: string | null
          signed_up_at?: string | null
          tier?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          organization?: string | null
          referral_code?: string
          referral_count?: number | null
          referred_by_code?: string | null
          signed_up_at?: string | null
          tier?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gifted_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          gifted_by: string
          id: string
          is_active: boolean
          reason: string | null
          starts_at: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          gifted_by: string
          id?: string
          is_active?: boolean
          reason?: string | null
          starts_at?: string
          tier: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          gifted_by?: string
          id?: string
          is_active?: boolean
          reason?: string | null
          starts_at?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      golden_library_sources: {
        Row: {
          author: string | null
          citation_ref: string | null
          content: string
          created_at: string
          id: string
          is_active: boolean
          metadata_json: Json | null
          proof_category: string | null
          source_type: string
          source_url: string | null
          summary: string | null
          tags: string[] | null
          tier: number
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          author?: string | null
          citation_ref?: string | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          metadata_json?: Json | null
          proof_category?: string | null
          source_type: string
          source_url?: string | null
          summary?: string | null
          tags?: string[] | null
          tier?: number
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          author?: string | null
          citation_ref?: string | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          metadata_json?: Json | null
          proof_category?: string | null
          source_type?: string
          source_url?: string | null
          summary?: string | null
          tags?: string[] | null
          tier?: number
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      greek_chapters: {
        Row: {
          chapter_name: string
          city: string
          contact_email: string | null
          created_at: string
          description: string | null
          id: string
          is_faith_focused: boolean | null
          latitude: number | null
          longitude: number | null
          organization: string
          school_name: string | null
          state: string
          submitted_by: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          chapter_name: string
          city: string
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_faith_focused?: boolean | null
          latitude?: number | null
          longitude?: number | null
          organization: string
          school_name?: string | null
          state: string
          submitted_by?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          chapter_name?: string
          city?: string
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_faith_focused?: boolean | null
          latitude?: number | null
          longitude?: number | null
          organization?: string
          school_name?: string | null
          state?: string
          submitted_by?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      greek_events: {
        Row: {
          city: string | null
          cost_details: string | null
          created_at: string
          description: string | null
          end_date: string | null
          event_type: string
          id: string
          image_url: string | null
          is_approved: boolean | null
          is_free: boolean | null
          is_virtual: boolean | null
          location_name: string | null
          organization: string | null
          registration_url: string | null
          start_date: string
          state: string | null
          submitted_by: string | null
          title: string
          updated_at: string
          virtual_link: string | null
        }
        Insert: {
          city?: string | null
          cost_details?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_free?: boolean | null
          is_virtual?: boolean | null
          location_name?: string | null
          organization?: string | null
          registration_url?: string | null
          start_date: string
          state?: string | null
          submitted_by?: string | null
          title: string
          updated_at?: string
          virtual_link?: string | null
        }
        Update: {
          city?: string | null
          cost_details?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_free?: boolean | null
          is_virtual?: boolean | null
          location_name?: string | null
          organization?: string | null
          registration_url?: string | null
          start_date?: string
          state?: string | null
          submitted_by?: string | null
          title?: string
          updated_at?: string
          virtual_link?: string | null
        }
        Relationships: []
      }
      healing_stories: {
        Row: {
          approved: boolean
          consent_to_publish: boolean
          created_at: string
          email: string | null
          featured: boolean
          healing_type: string
          id: string
          name: string | null
          organization: string | null
          story_content: string
          story_title: string
          updated_at: string
        }
        Insert: {
          approved?: boolean
          consent_to_publish?: boolean
          created_at?: string
          email?: string | null
          featured?: boolean
          healing_type?: string
          id?: string
          name?: string | null
          organization?: string | null
          story_content: string
          story_title: string
          updated_at?: string
        }
        Update: {
          approved?: boolean
          consent_to_publish?: boolean
          created_at?: string
          email?: string | null
          featured?: boolean
          healing_type?: string
          id?: string
          name?: string | null
          organization?: string | null
          story_content?: string
          story_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          day_number: number
          id: string
          reflection_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          day_number: number
          id?: string
          reflection_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          day_number?: number
          id?: string
          reflection_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      landing_page_conversions: {
        Row: {
          conversion_type: string
          converted_at: string
          id: string
          user_id: string | null
          variant_id: string
          visit_id: string
        }
        Insert: {
          conversion_type: string
          converted_at?: string
          id?: string
          user_id?: string | null
          variant_id: string
          visit_id: string
        }
        Update: {
          conversion_type?: string
          converted_at?: string
          id?: string
          user_id?: string | null
          variant_id?: string
          visit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_conversions_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "landing_page_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "landing_page_conversions_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "landing_page_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_variants: {
        Row: {
          created_at: string
          cta_text: string
          headline: string
          id: string
          is_active: boolean
          is_control: boolean
          name: string
          subheadline: string | null
          updated_at: string
          variant_key: string
          weight: number
        }
        Insert: {
          created_at?: string
          cta_text?: string
          headline: string
          id?: string
          is_active?: boolean
          is_control?: boolean
          name: string
          subheadline?: string | null
          updated_at?: string
          variant_key: string
          weight?: number
        }
        Update: {
          created_at?: string
          cta_text?: string
          headline?: string
          id?: string
          is_active?: boolean
          is_control?: boolean
          name?: string
          subheadline?: string | null
          updated_at?: string
          variant_key?: string
          weight?: number
        }
        Relationships: []
      }
      landing_page_visits: {
        Row: {
          id: string
          referrer: string | null
          session_id: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          variant_id: string
          visited_at: string
        }
        Insert: {
          id?: string
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant_id: string
          visited_at?: string
        }
        Update: {
          id?: string
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant_id?: string
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_visits_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "landing_page_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_segments: {
        Row: {
          created_at: string
          email: string
          id: string
          last_activity_at: string
          segment_type: string
          source_campaign_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_activity_at?: string
          segment_type: string
          source_campaign_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_activity_at?: string
          segment_type?: string
          source_campaign_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_segments_source_campaign_id_fkey"
            columns: ["source_campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      media_inquiries: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string
          name: string
          organization: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message: string
          name: string
          organization?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string
          name?: string
          organization?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      member_connections: {
        Row: {
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      morning_notification_settings: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          include_streak_reminder: boolean | null
          include_verse_preview: boolean | null
          notification_time: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          include_streak_reminder?: boolean | null
          include_verse_preview?: boolean | null
          notification_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          include_streak_reminder?: boolean | null
          include_verse_preview?: boolean | null
          notification_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      myth_buster_downloads: {
        Row: {
          created_at: string
          download_count: number
          id: string
          resource_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          download_count?: number
          id?: string
          resource_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          download_count?: number
          id?: string
          resource_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notification_campaigns: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          message_body: string
          message_title: string
          name: string
          recipients_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number | null
          status: string
          target_segments: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          message_body: string
          message_title: string
          name: string
          recipients_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          target_segments?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          message_body?: string
          message_title?: string
          name?: string
          recipients_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          target_segments?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      objection_cards: {
        Row: {
          audience_notes_json: Json | null
          boundary_statement: string
          claim_category: string
          claim_text: string
          created_at: string
          dialogue_questions: string[]
          five_minute_response: string
          id: string
          is_active: boolean
          prayer: string
          proof_breakdown_json: Json
          scripture_refs: string[]
          sixty_second_response: string
          source_ids: string[] | null
          updated_at: string
          version: number
        }
        Insert: {
          audience_notes_json?: Json | null
          boundary_statement: string
          claim_category: string
          claim_text: string
          created_at?: string
          dialogue_questions?: string[]
          five_minute_response: string
          id?: string
          is_active?: boolean
          prayer: string
          proof_breakdown_json?: Json
          scripture_refs?: string[]
          sixty_second_response: string
          source_ids?: string[] | null
          updated_at?: string
          version?: number
        }
        Update: {
          audience_notes_json?: Json | null
          boundary_statement?: string
          claim_category?: string
          claim_text?: string
          created_at?: string
          dialogue_questions?: string[]
          five_minute_response?: string
          id?: string
          is_active?: boolean
          prayer?: string
          proof_breakdown_json?: Json
          scripture_refs?: string[]
          sixty_second_response?: string
          source_ids?: string[] | null
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      output_citations: {
        Row: {
          created_at: string
          excerpt: string | null
          field_name: string
          id: string
          objection_card_id: string | null
          source_id: string | null
          worker_run_id: string | null
        }
        Insert: {
          created_at?: string
          excerpt?: string | null
          field_name: string
          id?: string
          objection_card_id?: string | null
          source_id?: string | null
          worker_run_id?: string | null
        }
        Update: {
          created_at?: string
          excerpt?: string | null
          field_name?: string
          id?: string
          objection_card_id?: string | null
          source_id?: string | null
          worker_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "output_citations_objection_card_id_fkey"
            columns: ["objection_card_id"]
            isOneToOne: false
            referencedRelation: "objection_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_citations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "golden_library_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_citations_worker_run_id_fkey"
            columns: ["worker_run_id"]
            isOneToOne: false
            referencedRelation: "worker_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      podcast_guest_applications: {
        Row: {
          admin_notes: string | null
          application_type: string
          chapter_name: string | null
          created_at: string
          email: string
          full_name: string
          greek_organization: string
          id: string
          linkedin_url: string | null
          phone: string | null
          previous_speaking: string | null
          status: string
          topic_expertise: string
          updated_at: string
          why_guest: string
        }
        Insert: {
          admin_notes?: string | null
          application_type?: string
          chapter_name?: string | null
          created_at?: string
          email: string
          full_name: string
          greek_organization: string
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          previous_speaking?: string | null
          status?: string
          topic_expertise: string
          updated_at?: string
          why_guest: string
        }
        Update: {
          admin_notes?: string | null
          application_type?: string
          chapter_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          greek_organization?: string
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          previous_speaking?: string | null
          status?: string
          topic_expertise?: string
          updated_at?: string
          why_guest?: string
        }
        Relationships: []
      }
      podcast_listening_progress: {
        Row: {
          created_at: string
          duration: number | null
          episode_pub_date: string | null
          episode_title: string
          episode_url: string
          id: string
          last_played_at: string
          playback_position: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration?: number | null
          episode_pub_date?: string | null
          episode_title: string
          episode_url: string
          id?: string
          last_played_at?: string
          playback_position?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration?: number | null
          episode_pub_date?: string | null
          episode_title?: string
          episode_url?: string
          id?: string
          last_played_at?: string
          playback_position?: number
          updated_at?: string
          user_id?: string
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
          affiliation_type: string | null
          chapter_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          greek_council: string | null
          greek_organization: string | null
          id: string
          initiation_year: number | null
          member_status: string | null
          updated_at: string | null
        }
        Insert: {
          affiliation_type?: string | null
          chapter_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          greek_council?: string | null
          greek_organization?: string | null
          id: string
          initiation_year?: number | null
          member_status?: string | null
          updated_at?: string | null
        }
        Update: {
          affiliation_type?: string | null
          chapter_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          greek_council?: string | null
          greek_organization?: string | null
          id?: string
          initiation_year?: number | null
          member_status?: string | null
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
      qa_submissions: {
        Row: {
          answer: string | null
          answered_at: string | null
          answered_by: string | null
          category: string
          created_at: string
          email: string | null
          id: string
          is_featured: boolean
          is_public: boolean
          question: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          category?: string
          created_at?: string
          email?: string | null
          id?: string
          is_featured?: boolean
          is_public?: boolean
          question: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          category?: string
          created_at?: string
          email?: string | null
          id?: string
          is_featured?: boolean
          is_public?: boolean
          question?: string
          status?: string
          updated_at?: string
          user_id?: string | null
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
      reengagement_templates: {
        Row: {
          created_at: string
          days_inactive: number
          id: string
          is_active: boolean
          last_run_at: string | null
          message_body: string
          message_title: string
          name: string
          target_segment: string
          trigger_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_inactive?: number
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          message_body: string
          message_title: string
          name: string
          target_segment: string
          trigger_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_inactive?: number
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          message_body?: string
          message_title?: string
          name?: string
          target_segment?: string
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          converted_at: string | null
          created_at: string
          id: string
          referral_code: string
          referred_user_id: string | null
          referrer_id: string
          reward_earned: number
          status: string
        }
        Insert: {
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code: string
          referred_user_id?: string | null
          referrer_id: string
          reward_earned?: number
          status?: string
        }
        Update: {
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          referrer_id?: string
          reward_earned?: number
          status?: string
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
      saved_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          organization: string | null
          phone: string | null
          reminder_at: string | null
          reminder_sent: boolean | null
          source: string | null
          title: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          reminder_at?: string | null
          reminder_sent?: boolean | null
          source?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          reminder_at?: string | null
          reminder_sent?: boolean | null
          source?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      saved_response_coach_results: {
        Row: {
          context: string | null
          created_at: string
          feedback_json: Json
          id: string
          notes: string | null
          original_response: string
          scenario: string
          updated_at: string
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          feedback_json: Json
          id?: string
          notes?: string | null
          original_response: string
          scenario: string
          updated_at?: string
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          feedback_json?: Json
          id?: string
          notes?: string | null
          original_response?: string
          scenario?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_scan_results: {
        Row: {
          created_at: string
          critical_count: number
          findings_json: Json
          id: string
          info_count: number
          scan_type: string
          scanned_at: string
          status: string
          warning_count: number
        }
        Insert: {
          created_at?: string
          critical_count?: number
          findings_json?: Json
          id?: string
          info_count?: number
          scan_type?: string
          scanned_at?: string
          status?: string
          warning_count?: number
        }
        Update: {
          created_at?: string
          critical_count?: number
          findings_json?: Json
          id?: string
          info_count?: number
          scan_type?: string
          scanned_at?: string
          status?: string
          warning_count?: number
        }
        Relationships: []
      }
      shared_certificates: {
        Row: {
          assessment_type: string
          certificate_type: string
          completion_date: string
          created_at: string
          expires_at: string | null
          id: string
          last_viewed_at: string | null
          og_image_url: string | null
          scenario: string
          share_token: string
          theme: string
          user_id: string
          user_name: string
          view_count: number | null
        }
        Insert: {
          assessment_type: string
          certificate_type: string
          completion_date: string
          created_at?: string
          expires_at?: string | null
          id?: string
          last_viewed_at?: string | null
          og_image_url?: string | null
          scenario: string
          share_token: string
          theme?: string
          user_id: string
          user_name: string
          view_count?: number | null
        }
        Update: {
          assessment_type?: string
          certificate_type?: string
          completion_date?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          last_viewed_at?: string | null
          og_image_url?: string | null
          scenario?: string
          share_token?: string
          theme?: string
          user_id?: string
          user_name?: string
          view_count?: number | null
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
            referencedRelation: "assessment_analytics_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_symbol_bookmarks: {
        Row: {
          bookmark_ids: string[]
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          is_public: boolean
          share_token: string
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
        }
        Insert: {
          bookmark_ids?: string[]
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          share_token: string
          title?: string
          updated_at?: string
          user_id: string
          view_count?: number | null
        }
        Update: {
          bookmark_ids?: string[]
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          share_token?: string
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
      shattered_masks_results: {
        Row: {
          archetype: string
          archetype_description: string | null
          created_at: string
          growth_areas: string[] | null
          id: string
          notes: string | null
          strengths: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          archetype: string
          archetype_description?: string | null
          created_at?: string
          growth_areas?: string[] | null
          id?: string
          notes?: string | null
          strengths?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          archetype?: string
          archetype_description?: string | null
          created_at?: string
          growth_areas?: string[] | null
          id?: string
          notes?: string | null
          strengths?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      speaking_requests: {
        Row: {
          additional_details: string | null
          book_table_requested: boolean | null
          budget_range: string
          created_at: string
          event_date: string
          event_location: string
          event_name: string
          event_promotion: string | null
          event_type: string
          expected_attendees: string
          id: string
          merchandise_sales: string | null
          organization_name: string
          organizer_email: string
          organizer_name: string
          organizer_phone: string
          status: string
          topic_requested: string
          updated_at: string
        }
        Insert: {
          additional_details?: string | null
          book_table_requested?: boolean | null
          budget_range: string
          created_at?: string
          event_date: string
          event_location: string
          event_name: string
          event_promotion?: string | null
          event_type: string
          expected_attendees: string
          id?: string
          merchandise_sales?: string | null
          organization_name: string
          organizer_email: string
          organizer_name: string
          organizer_phone: string
          status?: string
          topic_requested: string
          updated_at?: string
        }
        Update: {
          additional_details?: string | null
          book_table_requested?: boolean | null
          budget_range?: string
          created_at?: string
          event_date?: string
          event_location?: string
          event_name?: string
          event_promotion?: string | null
          event_type?: string
          expected_attendees?: string
          id?: string
          merchandise_sales?: string | null
          organization_name?: string
          organizer_email?: string
          organizer_name?: string
          organizer_phone?: string
          status?: string
          topic_requested?: string
          updated_at?: string
        }
        Relationships: []
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
          current_streak: number | null
          id: string
          last_engagement_date: string | null
          longest_streak: number | null
          streak_updated_at: string | null
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_level?: number
          current_streak?: number | null
          id?: string
          last_engagement_date?: string | null
          longest_streak?: number | null
          streak_updated_at?: string | null
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_level?: number
          current_streak?: number | null
          id?: string
          last_engagement_date?: string | null
          longest_streak?: number | null
          streak_updated_at?: string | null
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
      video_assets: {
        Row: {
          captions_url: string | null
          created_at: string
          duration_seconds: number | null
          file_size_bytes: number | null
          id: string
          metadata_json: Json | null
          resolution: string | null
          thumbnail_url: string | null
          transcript_text: string | null
          video_request_id: string
          video_url: string
        }
        Insert: {
          captions_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          metadata_json?: Json | null
          resolution?: string | null
          thumbnail_url?: string | null
          transcript_text?: string | null
          video_request_id: string
          video_url: string
        }
        Update: {
          captions_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          metadata_json?: Json | null
          resolution?: string | null
          thumbnail_url?: string | null
          transcript_text?: string | null
          video_request_id?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_assets_video_request_id_fkey"
            columns: ["video_request_id"]
            isOneToOne: false
            referencedRelation: "video_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      video_citations: {
        Row: {
          created_at: string
          id: string
          objection_card_id: string | null
          segment_label: string | null
          source_id: string | null
          video_request_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          objection_card_id?: string | null
          segment_label?: string | null
          source_id?: string | null
          video_request_id: string
        }
        Update: {
          created_at?: string
          id?: string
          objection_card_id?: string | null
          segment_label?: string | null
          source_id?: string | null
          video_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_citations_objection_card_id_fkey"
            columns: ["objection_card_id"]
            isOneToOne: false
            referencedRelation: "objection_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_citations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "golden_library_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_citations_video_request_id_fkey"
            columns: ["video_request_id"]
            isOneToOne: false
            referencedRelation: "video_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      video_jobs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          metadata_json: Json | null
          provider: string
          provider_job_id: string | null
          status: string
          updated_at: string
          video_request_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          metadata_json?: Json | null
          provider?: string
          provider_job_id?: string | null
          status?: string
          updated_at?: string
          video_request_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          metadata_json?: Json | null
          provider?: string
          provider_job_id?: string | null
          status?: string
          updated_at?: string
          video_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_jobs_video_request_id_fkey"
            columns: ["video_request_id"]
            isOneToOne: false
            referencedRelation: "video_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      video_requests: {
        Row: {
          blocked_reason: string | null
          captions_text: string | null
          created_at: string
          description: string | null
          id: string
          input_content_ids: string[] | null
          scene_plan_json: Json | null
          script_json: Json | null
          status: string
          tags: string[] | null
          template_type: string
          thumbnail_prompt: string | null
          title: string
          transcript_text: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          blocked_reason?: string | null
          captions_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          input_content_ids?: string[] | null
          scene_plan_json?: Json | null
          script_json?: Json | null
          status?: string
          tags?: string[] | null
          template_type: string
          thumbnail_prompt?: string | null
          title: string
          transcript_text?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          blocked_reason?: string | null
          captions_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          input_content_ids?: string[] | null
          scene_plan_json?: Json | null
          script_json?: Json | null
          status?: string
          tags?: string[] | null
          template_type?: string
          thumbnail_prompt?: string | null
          title?: string
          transcript_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_suggestions: {
        Row: {
          admin_notes: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          suggested_tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
        }
        Insert: {
          admin_notes?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          suggested_tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
        }
        Update: {
          admin_notes?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          suggested_tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
        }
        Relationships: []
      }
      webinar_registrations: {
        Row: {
          created_at: string
          email: string
          full_name: string
          greek_organization: string | null
          how_heard: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string | null
          webinar_id: string
          webinar_title: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          greek_organization?: string | null
          how_heard?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          webinar_id: string
          webinar_title: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          greek_organization?: string | null
          how_heard?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          webinar_id?: string
          webinar_title?: string
        }
        Relationships: []
      }
      worker_event_log: {
        Row: {
          created_at: string
          event_data_json: Json | null
          event_type: string
          id: string
          worker_run_id: string | null
        }
        Insert: {
          created_at?: string
          event_data_json?: Json | null
          event_type: string
          id?: string
          worker_run_id?: string | null
        }
        Update: {
          created_at?: string
          event_data_json?: Json | null
          event_type?: string
          id?: string
          worker_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_event_log_worker_run_id_fkey"
            columns: ["worker_run_id"]
            isOneToOne: false
            referencedRelation: "worker_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_output_feedback: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          output_history_id: string | null
          rating: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          output_history_id?: string | null
          rating: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          output_history_id?: string | null
          rating?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_output_feedback_output_history_id_fkey"
            columns: ["output_history_id"]
            isOneToOne: false
            referencedRelation: "worker_output_history"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_output_history: {
        Row: {
          created_at: string
          id: string
          is_bookmarked: boolean
          output_json: Json
          title: string
          user_id: string
          worker_run_id: string | null
          worker_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          output_json?: Json
          title: string
          user_id: string
          worker_run_id?: string | null
          worker_type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          output_json?: Json
          title?: string
          user_id?: string
          worker_run_id?: string | null
          worker_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_output_history_worker_run_id_fkey"
            columns: ["worker_run_id"]
            isOneToOne: false
            referencedRelation: "worker_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_runs: {
        Row: {
          citations_json: Json | null
          confidence_score: number | null
          created_at: string
          duration_ms: number | null
          escalated: boolean
          escalation_reason: string | null
          id: string
          intake_json: Json
          output_json: Json | null
          status: string
          trigger_type: string
          updated_at: string
          user_id: string | null
          worker_type: string
        }
        Insert: {
          citations_json?: Json | null
          confidence_score?: number | null
          created_at?: string
          duration_ms?: number | null
          escalated?: boolean
          escalation_reason?: string | null
          id?: string
          intake_json?: Json
          output_json?: Json | null
          status?: string
          trigger_type?: string
          updated_at?: string
          user_id?: string | null
          worker_type: string
        }
        Update: {
          citations_json?: Json | null
          confidence_score?: number | null
          created_at?: string
          duration_ms?: number | null
          escalated?: boolean
          escalation_reason?: string | null
          id?: string
          intake_json?: Json
          output_json?: Json | null
          status?: string
          trigger_type?: string
          updated_at?: string
          user_id?: string | null
          worker_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      assessment_analytics_safe: {
        Row: {
          created_at: string | null
          id: string | null
          is_authenticated_user: boolean | null
          result_type: string | null
          scenario: string | null
          scores_json: Json | null
          track: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_authenticated_user?: never
          result_type?: string | null
          scenario?: string | null
          scores_json?: Json | null
          track?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_authenticated_user?: never
          result_type?: string | null
          scenario?: string | null
          scores_json?: Json | null
          track?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      assessment_submissions_safe: {
        Row: {
          answers_json: Json | null
          consent_to_contact: boolean | null
          created_at: string | null
          id: string | null
          result_type: string | null
          scenario: string | null
          scores_json: Json | null
          track: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          answers_json?: Json | null
          consent_to_contact?: boolean | null
          created_at?: string | null
          id?: string | null
          result_type?: string | null
          scenario?: string | null
          scores_json?: Json | null
          track?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          answers_json?: Json | null
          consent_to_contact?: boolean | null
          created_at?: string | null
          id?: string | null
          result_type?: string | null
          scenario?: string | null
          scores_json?: Json | null
          track?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      d9_business_directory_public: {
        Row: {
          business_category: string | null
          business_name: string | null
          created_at: string | null
          description: string | null
          faith_statement: string | null
          featured: boolean | null
          greek_organization: string | null
          id: string | null
          is_active: boolean | null
          location_city: string | null
          location_state: string | null
          logo_url: string | null
          owner_name: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          business_category?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          faith_statement?: string | null
          featured?: boolean | null
          greek_organization?: string | null
          id?: string | null
          is_active?: boolean | null
          location_city?: string | null
          location_state?: string | null
          logo_url?: string | null
          owner_name?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          business_category?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          faith_statement?: string | null
          featured?: boolean | null
          greek_organization?: string | null
          id?: string | null
          is_active?: boolean | null
          location_city?: string | null
          location_state?: string | null
          logo_url?: string | null
          owner_name?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      email_sends_safe: {
        Row: {
          campaign_id: string | null
          id: string | null
          recipient_email_masked: string | null
          sent_at: string | null
          tracking_token: string | null
          user_id: string | null
          variant_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          id?: string | null
          recipient_email_masked?: never
          sent_at?: string | null
          tracking_token?: string | null
          user_id?: string | null
          variant_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          id?: string | null
          recipient_email_masked?: never
          sent_at?: string | null
          tracking_token?: string | null
          user_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "email_subject_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      healing_stories_public: {
        Row: {
          created_at: string | null
          featured: boolean | null
          healing_type: string | null
          id: string | null
          name: string | null
          organization: string | null
          story_content: string | null
          story_title: string | null
        }
        Insert: {
          created_at?: string | null
          featured?: boolean | null
          healing_type?: string | null
          id?: string | null
          name?: string | null
          organization?: string | null
          story_content?: string | null
          story_title?: string | null
        }
        Update: {
          created_at?: string | null
          featured?: boolean | null
          healing_type?: string | null
          id?: string | null
          name?: string | null
          organization?: string | null
          story_content?: string | null
          story_title?: string | null
        }
        Relationships: []
      }
      qa_public_answers: {
        Row: {
          answer: string | null
          answered_at: string | null
          category: string | null
          created_at: string | null
          id: string | null
          is_featured: boolean | null
          question: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          category?: string | null
          created_at?: string | null
          id?: string | null
          is_featured?: boolean | null
          question?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          category?: string | null
          created_at?: string | null
          id?: string | null
          is_featured?: boolean | null
          question?: string | null
        }
        Relationships: []
      }
      qa_submissions_safe: {
        Row: {
          answer: string | null
          answered_at: string | null
          category: string | null
          created_at: string | null
          email: string | null
          id: string | null
          is_featured: boolean | null
          is_public: boolean | null
          question: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          category?: string | null
          created_at?: string | null
          email?: never
          id?: string | null
          is_featured?: boolean | null
          is_public?: boolean | null
          question?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          category?: string | null
          created_at?: string | null
          email?: never
          id?: string | null
          is_featured?: boolean | null
          is_public?: boolean | null
          question?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      award_points: {
        Args: { _action_type: string; _points: number; _user_id: string }
        Returns: Json
      }
      calculate_level: { Args: { points: number }; Returns: number }
      can_view_shared_certificate: {
        Args: { _share_token: string }
        Returns: boolean
      }
      can_view_shared_result: {
        Args: { _share_token: string }
        Returns: boolean
      }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      generate_referral_code: { Args: never; Returns: string }
      generate_symbol_share_token: { Args: never; Returns: string }
      get_assessment_email_secure: {
        Args: { submission_id: string }
        Returns: string
      }
      get_business_contact_details: {
        Args: { business_id: string }
        Returns: Json
      }
      get_email_send_recipient: { Args: { send_id: string }; Returns: string }
      get_submission_email_if_consented: {
        Args: { submission_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_download_count: {
        Args: { resource_id_param: string }
        Returns: number
      }
      update_user_streak: { Args: { _user_id: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "user"
      expense_category_type: "standard" | "custom"
      expense_status: "pending" | "approved" | "rejected" | "reimbursed"
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
      expense_category_type: ["standard", "custom"],
      expense_status: ["pending", "approved", "rejected", "reimbursed"],
    },
  },
} as const

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { InstallPrompt } from "@/components/InstallPrompt";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Devotional from "./pages/Devotional";
import PrayerJournal from "./pages/PrayerJournal";
import AssessmentHistory from "./pages/AssessmentHistory";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import FAQ from "./pages/FAQ";
import Bookmarks from "./pages/Bookmarks";
import Guide from "./pages/Guide";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <InstallPrompt />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/devotional" element={
              <ProtectedRoute>
                <Devotional />
              </ProtectedRoute>
            } />
            <Route path="/prayer-journal" element={
              <ProtectedRoute>
                <PrayerJournal />
              </ProtectedRoute>
            } />
            <Route path="/assessment-history" element={
              <ProtectedRoute>
                <AssessmentHistory />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/bookmarks" element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            } />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

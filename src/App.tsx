
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InputPage from "./pages/InputPage";
import ReportsPage from "./pages/ReportsPage";
import ExpensesPage from "./pages/ExpensesPage";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/layout/AuthLayout";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('bjt-auth');
    setIsAuthenticated(!!auth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <AuthLayout isAuthenticated={isAuthenticated}>
                  <DashboardPage />
                </AuthLayout>
              } 
            />
            
            <Route 
              path="/input" 
              element={
                <AuthLayout isAuthenticated={isAuthenticated}>
                  <InputPage />
                </AuthLayout>
              } 
            />
            
            <Route 
              path="/expenses" 
              element={
                <AuthLayout isAuthenticated={isAuthenticated}>
                  <ExpensesPage />
                </AuthLayout>
              } 
            />
            
            <Route 
              path="/reports" 
              element={
                <AuthLayout isAuthenticated={isAuthenticated}>
                  <ReportsPage />
                </AuthLayout>
              } 
            />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

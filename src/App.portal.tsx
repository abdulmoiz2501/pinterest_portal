import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/admin/Login";
import AdminProducts from "./pages/admin/Products";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

// Portal-only App - only admin routes
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to admin login */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


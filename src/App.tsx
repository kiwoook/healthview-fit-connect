
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Routines from "./pages/Routines";
import Records from "./pages/Records";
import Trainers from "./pages/Trainers";
import Community from "./pages/Community";
import Shorts from "./pages/Shorts";
import Search from "./pages/Search";
import CreateRoutine from "./pages/CreateRoutine";
import ExerciseExplore from "./pages/ExerciseExplore";
import ExerciseDetail from "./pages/ExerciseDetail";
import FitnessOnboarding from "./pages/FitnessOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/routines/create" element={<CreateRoutine />} />
              <Route path="/records" element={<Records />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/community" element={<Community />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/search" element={<Search />} />
              <Route path="/exercises" element={<ExerciseExplore />} />
              <Route path="/exercises/:id" element={<ExerciseDetail />} />
              <Route path="/fitness-assessment" element={<FitnessOnboarding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

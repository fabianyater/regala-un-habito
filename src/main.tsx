import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App.tsx";
import { HabitGrid } from "./components/HabitGrid/HabitGrid.tsx";
import { RewardProvider } from "./context/RewardProvider.tsx";
import "./index.css";
import { Habits } from "./pages/habitos/Habits.tsx";
import { Gift } from "./pages/regalo/Gift.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RewardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/habito" element={<App />} />
          <Route path="/regalo" element={<Gift />} />
          <Route path="/habitos" element={<Habits />}>
            <Route path=":id" element={<HabitGrid />} />
          </Route>
          <Route path="/" element={<Navigate to="/habito" />} />
          <Route path="*" element={<Navigate to="/habito" />} />
        </Routes>
      </BrowserRouter>
    </RewardProvider>
  </StrictMode>
);

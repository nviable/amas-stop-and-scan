import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import CaseFile from "./pages/CaseFile";
import Resources from "./pages/Resources";
import ResourceStep from "./pages/ResourceStep";
import Journal from "./pages/Journal";
import Project from "./pages/Project";
import MeetAmito from "./pages/MeetAmito";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="practice" element={<Practice />} />
        <Route path="practice/:slug" element={<CaseFile />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:step" element={<ResourceStep />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:id" element={<Journal />} />
        <Route path="project" element={<Project />} />
        <Route path="amito" element={<MeetAmito />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

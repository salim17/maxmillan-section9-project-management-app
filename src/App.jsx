import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [createNewProject, setCreateNewProject] = useState(true);
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {createNewProject && <NewProject />}
    </main>
  );
}

export default App;

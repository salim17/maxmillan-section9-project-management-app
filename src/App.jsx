import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [createNewProject, setCreateNewProject] = useState(false);

  function handleCreateProject() {
    setCreateNewProject(true);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar createProject={handleCreateProject} />
      {createNewProject ? <NewProject /> : <NoProjectSelected />}
    </main>
  );
}

export default App;

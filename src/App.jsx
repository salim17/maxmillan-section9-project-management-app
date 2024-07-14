import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleCreateNewProject() {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectId: null,
      };
    });
  }

  function handleSaveProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        projects: [...projectsState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectId: undefined,
        // filter returns a brand new array
        projects: previousState.projects.filter(
          (project) => project.id !== previousState.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...projectsState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        // filter returns a brand new array
        tasks: previousState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleSaveProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected createNewProject={handleCreateNewProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        createNewProject={handleCreateNewProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

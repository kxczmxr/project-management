import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    function handleAddTask(text){
        setProjectsState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text,
                projectId: prevState.selectedProjectId,
                id: taskId
            }
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            };
        });
    }

    function handleDeleteTask(id){
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            }
        })
    }

    function handleSelectProject(projectId) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: projectId
            }
        })
    }
    function handleStartAddingProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        })
    }

    function handleCancelAddingProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        })
    }

    function handleAddProject(projectData){
        setProjectsState(prevState => {
            const newProject = {
                ...projectData,
                id: Math.random()
            }
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
                selectedProjectId: undefined
            }
        })
    }
    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
    let content = (<SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
        />
    );
    if(projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddingProject}/>
    }else if(projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddingProject={handleStartAddingProject}/>
    }

    console.log(projectsState);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
          onSelectProject={handleSelectProject}
          onStartAddingProject={handleStartAddingProject}
          projects={projectsState.projects}/>
        {content}
    </main>
  )
}

export default App;

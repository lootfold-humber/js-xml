import Project from "./project";

const Projects = ({ projects }) => {
  return (
    <section className="w3-center w3-padding">
      <h2 className="heading">Projects</h2>
      <div className="w3-row">
        {projects.map((p) => (
          <Project key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

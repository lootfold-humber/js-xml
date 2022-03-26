const Project = ({ project }) => {
  const { title, content, photo } = project;
  return (
    <section className="w3-col l6">
      <img
        className="w3-round project-img"
        src={photo}
        alt="project screenshot"
      />
      <h3>{title}</h3>
      <p>{content}</p>
      <hr />
    </section>
  );
};

export default Project;

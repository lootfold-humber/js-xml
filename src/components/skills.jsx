const Skills = ({ skills }) => {
  return (
    <section className="w3-center w3-padding">
      <h2 className="heading">Skills</h2>
      <ul>
        {skills.map((s) => (
          <li key={s.id} className="w3-badge w3-large w3-padding">
            {s.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;

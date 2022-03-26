function getProfile() {
  return {
    first: "Pallav",
    last: "Dubey",
    about:
      "I'm a Toronto based full-stack developer proficient in ASP.NET and Angular.",
    photo: "",
  };
}

function getProjects() {
  return [
    {
      id: 1,
      title: "Monopoly Banker",
      content:
        "A web app to manage bank for monopoly players. Developed using HTML, CSS & javascript.",
      photo: "",
    },
    {
      id: 2,
      title: "Shopping List",
      content:
        "A web app to manage shoppping list. Developed using Angular, Material Design, ASP.NET Core & SqlServer.",
      photo: "",
    },
  ];
}

function getSkills() {
  return [
    { id: 1, name: "HTML" },
    { id: 2, name: "CSS" },
    { id: 3, name: "Javascript" },
    { id: 4, name: "Angular" },
    { id: 5, name: "React" },
    { id: 6, name: "C" },
    { id: 7, name: "ASP" },
    { id: 8, name: "PHP" },
    { id: 9, name: "Node" },
  ];
}

const service = {
  getProfile,
  getProjects,
  getSkills,
};

export default service;

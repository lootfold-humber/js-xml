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

const service = {
  getProfile,
  getProjects,
};

export default service;

import service from "./service";

const userId = 1;

async function getProfile() {
  const url = `/api/users/${userId}`;
  return await service.getRequest(url);
}

async function getProjects() {
  const url = `/api/projects/${userId}`;
  return await service.getRequest(url);
}

async function getSkills() {
  const url = `/api/skills/${userId}`;
  return await service.getRequest(url);
}

async function postContactRequest(data) {
  const url = `api/contactrequests`;
  await service.postRequest(url, data);
}

const userService = {
  getProfile,
  getProjects,
  getSkills,
  postContactRequest,
};

export default userService;

async function getRequest(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      console.log(res);
      return await res.json();
    }
  } catch (e) {
    console.error(e);
  }
}

async function postRequest(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.ok;
  } catch (e) {
    console.error(e);
  }
}

const service = {
  getRequest,
  postRequest,
};

export default service;

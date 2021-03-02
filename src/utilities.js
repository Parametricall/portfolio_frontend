import { FETCH_USERS_URL } from "./constants";

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function handleJSONResponse(setUserAuthenticated, json, status) {
  if (status !== 200) {
    setUserAuthenticated(false);
  } else {
    setUserAuthenticated(true);
  }

  return json;
}

export async function getData(setUserAuthenticated, url = FETCH_USERS_URL) {
  try {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        ...getTokenFromStorage(),
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
    });

    const json = await response.json();
    return handleJSONResponse(setUserAuthenticated, json, response.status);
  } catch (e) {
    console.warn(e);
  }
}

function getTokenFromStorage() {
  let token = localStorage.getItem("user");

  if (token) {
    token = JSON.parse(token).token;
    return { Authorization: `Token ${token}` };
  }
  return null;
}

export async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...getTokenFromStorage(),
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data),
  });

  return await response.json(); // parses JSON response into native JavaScript objects
}

export async function updateData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...getTokenFromStorage(),
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data),
  });

  return await response.json(); // parses JSON response into native JavaScript objects
}

export async function deleteData(url) {
  // Default options are marked with *
  await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...getTokenFromStorage(),
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  }).catch((e) => {
    console.log(e);
  });
}

export function splitArrayIntoChunks(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

// export async function getData(url = URL) {
//
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'GET', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // no-referrer, *client
//     })
//
//     return await response.json(); // parses JSON response into native JavaScript objects
// }

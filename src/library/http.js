export async function get(endpoint) {
    const response = await fetch(endpoint);
    const json = await response.json();

    return json;
}

export async function post(endpoint, jsonData) {
    const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(jsonData),
    });
    const json = await response.json();

    return json;
}

export async function put(endpoint, jsonData) {
    const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(jsonData),
    });
    const json = await response.json();

    return json;
}

export async function del(endpoint) {
    const response = await fetch(endpoint, {
        method: 'DELETE'
    });
    const json = await response.json();

    return json;
}
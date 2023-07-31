export async function getResolutions() {
    const response = await fetch('todo.json')
    const result = await response.json()

    return result
}

export async function getResolution(id) {
    const data = await get('/resolutions/' + id)

    return data
}

export async function addResolution(formData) {
    const data = await post('/resolutions', formData)

    return data
}

export async function updateResolution(id, formData) {
    const data = await post("/resolutions/update/" + id, formData)

    return data
}

export async function deleteResolution(id) {
    const data = await post("/resolutions/delete/" + id)

    return data
}
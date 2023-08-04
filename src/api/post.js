import { get, post, put, del } from "../library/http";

export async function getPosts() {
    const data = await get('https://jsonplaceholder.typicode.com/posts')

    return data
}

export async function getPost(id) {
    const data = await get('https://jsonplaceholder.typicode.com/posts/' + id)

    return data
}

export async function addPost(json) {
    const data = await post('https://jsonplaceholder.typicode.com/posts', json)

    return data
}

export async function updatePost(id, json) {
    const data = await put('https://jsonplaceholder.typicode.com/posts/' + id, json)

    return data
}

export async function deletePost(id) {
    const data = await del('https://jsonplaceholder.typicode.com/posts/' + id)

    return data
}
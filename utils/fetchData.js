const baseUrl = process.env.BASE_URL
console.log(baseUrl)

const getBaseurl = () => {
    if(typeof window !== "undefined") {
        console.log(window.location);
        return window.location.origin;
    }
    return baseUrl
}
export const getData = async (url, token) => {
    const mainUrl = getBaseurl();
    const res = await fetch(`${mainUrl}/api/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    console.log(res)

    const data = await res.json();
    console.log(data, 'data')
    return data
}

export const postData = async (url, post, token) => {
    const mainUrl = getBaseurl();
    const res = await fetch(`${mainUrl}/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}



export const putData = async (url, post, token) => {
    const mainUrl = getBaseurl();
    const res = await fetch(`${mainUrl}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url, post, token) => {
    const mainUrl = getBaseurl();
    const res = await fetch(`${mainUrl}/api/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async (url, token) => {
    const mainUrl = getBaseurl();
    const res = await fetch(`${mainUrl}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}
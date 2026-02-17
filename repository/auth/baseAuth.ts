interface baseAuth {
    email : string,
    password : string,
    role : string
}

interface baseToken {
    token : string,
    role : string
}

export type { baseAuth, baseToken };
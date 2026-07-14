export let jwtToken = '';
export let basketId = 0;

export function setToken(token: string): void {
    jwtToken = token;
}

export function getToken(): string {
    return jwtToken;
}

export function setBasketId(id: number): void {
    basketId = id;
}

export function getBasketId(): number {
    return basketId;
}
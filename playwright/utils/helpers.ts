export function randomEmail(): string {
    return `user${Date.now()}@mail.com`;
}

export function randomPassword(): string {
    return `Pass@${Date.now()}`;
}

export function randomUsername(): string {
    return `User${Math.floor(Math.random() * 100000)}`;
}

export function currentDateTime(): string {
    return new Date().toISOString();
}
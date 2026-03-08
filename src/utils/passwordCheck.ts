export const passwordCheck = (password: string): number => {
    if (!password) return 0

    let score = 0

    if (password.length >= 8) score += 20

    if (/[a-z]/.test(password)) score += 20

    if (/[A-Z]/.test(password)) score += 20

    if (/[0-9]/.test(password)) score += 20

    if (/[^A-Za-z0-9]/.test(password)) score += 20

    return score
}

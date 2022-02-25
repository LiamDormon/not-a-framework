export function getPlayerLicense(source: number): string | null {
    const src = source.toString()
    for (let i = 0; i <= GetNumPlayerIdentifiers(src); i++) {
        const identifier = GetPlayerIdentifier(src, i)
        if (identifier.includes("license:"))
            return identifier.replace('license:', '')
    }

    return null
}
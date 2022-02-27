export function getPlayerIdentifier(source: number, type: string): string | undefined{
    return getPlayerIdentifiers(source).find((iden) => iden.includes(`${type}:`))
}
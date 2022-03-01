export async function getPlayerIdentifier(source: number, type: string): Promise<string | undefined> {
    return getPlayerIdentifiers(source).find((iden) => iden.includes(`${type}:`))
}
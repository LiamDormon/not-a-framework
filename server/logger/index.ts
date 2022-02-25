class _logger {
    constructor(private enabled: boolean) {}

    error(msg: string) {
        if (!this.enabled) return

        console.log(`[test-env][error]: ^1${msg}^0`)
    }

    info(msg: string) {
        if (!this.enabled) return

        console.log(`[test-env][info]: ^2${msg}^0`)
    }

    debug(msg: any) {
        if (!this.enabled) return
        console.log(msg)
    }
}

export default new _logger(GetConvarInt("debug", 1) == 1)
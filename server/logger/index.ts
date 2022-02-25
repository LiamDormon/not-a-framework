class _logger {
    private resourcename = GetCurrentResourceName()
    constructor(private enabled: boolean) {}

    error(msg: string) {
        if (!this.enabled) return

        console.log(`[${this.resourcename}][error]: ^1${msg}^0`)
    }

    info(msg: string) {
        if (!this.enabled) return

        console.log(`[${this.resourcename}][info]: ^5${msg}^0`)
    }

    debug(msg: any) {
        if (!this.enabled) return
        console.log(msg)
    }
}

export default new _logger(GetConvarInt("debug", 1) == 1)
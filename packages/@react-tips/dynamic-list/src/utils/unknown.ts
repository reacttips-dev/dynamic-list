export function unknown(e, t) {
    let n, a;
    return function() {
        for (var r = arguments.length, s = new Array(r),
                 i = 0; i < r; i++) s[i] = arguments[i];

        cancelAnimationFrame(a), n = performance.now();
        const o = r => {
            r > n + t ? e(...s) : a = requestAnimationFrame(o)
        };
        return a = requestAnimationFrame(o), a
    }
}

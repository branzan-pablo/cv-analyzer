// Polyfills for pdfjs-dist in Node.js environment

// @ts-ignore
if (typeof Promise.withResolvers === 'undefined') {
    // @ts-ignore
    Promise.withResolvers = function () {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}

// @ts-ignore
if (typeof global.DOMMatrix === 'undefined') {
    // @ts-ignore
    global.DOMMatrix = class DOMMatrix {
        a: number; b: number; c: number; d: number; e: number; f: number;
        m11: number; m12: number; m13: number; m14: number;
        m21: number; m22: number; m23: number; m24: number;
        m31: number; m32: number; m33: number; m34: number;
        m41: number; m42: number; m43: number; m44: number;
        is2D: boolean;

        constructor() {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
            this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
            this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
            this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
            this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
            this.is2D = true;
        }
    };
}

// @ts-ignore
if (typeof global.ImageData === 'undefined') {
    // @ts-ignore
    global.ImageData = class ImageData {
        data: any;
        width: any;
        height: any;

        constructor(data: any, width: any, height: any) {
            this.data = data;
            this.width = width;
            this.height = height;
        }
    };
}

// @ts-ignore
if (typeof global.Path2D === 'undefined') {
    // @ts-ignore
    global.Path2D = class Path2D { };
}

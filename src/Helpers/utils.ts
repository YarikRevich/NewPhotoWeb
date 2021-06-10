import type { SentData, StateComponenents, Util } from "./../types/index"

export const IsChosenTagInTags = <T>(tch: Array<T>, rt: Array<T>): boolean => {
    //Checks if chosen tags are in the available ones ...

    for (let r of tch) {
        if (rt.includes(r)) {
            return true;
        };
    };
    return false;
}

export const GetTagCoincidence = (at: string[], wt: string): string => {
    let coincidenceNum = 0;
    let coincidenceIndex = 0;
    for (let r of at) {
        let coincidenceNumLocal = 0;
        for (let i = 0; i <= wt.length - 1; i++) {
            if (r[i] !== wt[i]) {
                break
            }
            coincidenceNumLocal += 1
        }

        if (coincidenceNumLocal > coincidenceNum) {
            coincidenceNum = coincidenceNumLocal;
            coincidenceIndex = at.indexOf(r)
        }
    }
    if (coincidenceNum === 0 && coincidenceIndex === 0) {
        return ""
    }
    return at[coincidenceIndex]
}

export const GetSomeTagCoincidence = (at: string[], wt: string): string[] => {
    let r = at;
    const first = GetTagCoincidence(r, wt)
    const fi = r.indexOf(first)
    if (fi > -1) {
        r.splice(fi, 1)
    }
    const second = GetTagCoincidence(r, wt)
    const si = r.indexOf(second)
    if (si > -1) {
        r.splice(si, 1)
    }
    const third = GetTagCoincidence(r, wt)
    const ti = r.indexOf(third)
    if (ti > -1) {
        r.splice(ti, 1)
    }
    return [first, second, third]
}

export const OrderByTags = <T extends Util.Tagged<T>>(p: Array<T>, tch: string[]): Array<T> => {
    const result: Array<T> = []
    if (!p) return result

    for (let r of p) {
        if (tch.length === 0) {
            result.push(r);
            continue
        }
        if (r.tags) {
            if (IsChosenTagInTags(tch, r.tags)) {
                result.push(r);
            }
        }
    }
    return result
}

export const GetRandomName = (): string => {
    const symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "q"];
    const getRandomNum = (min: number, max: number): number => {
        return Math.floor(min + Math.random() * (max + 1 - min))
    }
    let result = "";
    for (let i = 0; i <= symbols.length; i++) {
        result += symbols[getRandomNum(0, symbols.length - 1)];
    }
    return result
}

const NOTAUTH_ERROR = 0;

export const IsAuthError = (e: number): boolean => {
    return e == NOTAUTH_ERROR
}
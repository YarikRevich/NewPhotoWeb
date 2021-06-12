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

export const GetTagCoincidence = (at: string[], wt: string): string | null => {
    let coincidenceNum = 0;
    let coincidenceIndex = 0;
    for (let r of at) {
        let coincidenceNumLocal = 0;
        for (let i = 0; i <= wt.length - 1; i++) {
            const f = r[i]
            const s = wt[i]
            if (f && s) {
                if (f.toLowerCase() !== s.toLowerCase()){
                    break
                }
            }
            coincidenceNumLocal += 1
        }

        if (coincidenceNumLocal > coincidenceNum) {
            coincidenceNum = coincidenceNumLocal;
            coincidenceIndex = at.indexOf(r)
        }
    }
    if (coincidenceNum === 0 && coincidenceIndex === 0) {
        return null
    }
    return at[coincidenceIndex]
}

export const GetSomeTagCoincidence = (at: string[], wt: string): string[] => {
    const r = at;
    const deleteTagFromSource = (s: string | null) => {
        if (s) {
            const fi = r.indexOf(s)
            if (fi > -1) {
                r.splice(fi, 1)
            }
        }
    }
    const first = GetTagCoincidence(r, wt)
    deleteTagFromSource(first)
    const second = GetTagCoincidence(r, wt)
    deleteTagFromSource(second)
    const third = GetTagCoincidence(r, wt)
    deleteTagFromSource(third)
    const result = []
    if (first) {
        result.push(first)
    }
    if (second) {
        result.push(second)
    }
    if (third) {
        result.push(third)
    }
    return result
}

export const OrderByTags = <T extends Util.Tagged>(p: Array<T>, tch: string[]): Array<T> => {
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
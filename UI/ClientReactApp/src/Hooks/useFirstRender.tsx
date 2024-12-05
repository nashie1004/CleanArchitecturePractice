import { useEffect, useRef } from "react"

export default function useFirstRender() {
    const ref = useRef(true);
    const firstRender = ref.current;

    useEffect(() => {
        if (firstRender) {
            ref.current = false;
        }
    }, [])

    return firstRender;
}
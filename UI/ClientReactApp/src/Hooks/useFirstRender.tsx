import { useEffect, useRef } from "react"

export default function useFirstRender() {
    const ref = useRef(true);
    let isFirstRender = ref.current;

    if (isFirstRender) {
        isFirstRender = false;
        return true; // First render
      }

    return isFirstRender;
}
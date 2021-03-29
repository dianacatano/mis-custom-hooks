import React, { useState, useRef, useEffect } from 'react';

export const useFetch = (url) => {

    // La función de de este useRef es que mantenga la referencia
    // cuando este hook o el componente que lo usa está aun montado
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(url).then(resp => resp.json()).then(data => {

            if (isMounted.current) {
                setState({
                    data,
                    loading: false,
                    error: null,
                });

            }
        });
    }, [url])

    return state;
}
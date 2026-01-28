/**
 * Transmissions Proxy Function
 * 
 * Proxies requests from /transmissions/* to the Payload CMS at https://soninewmedia.com/transmissions/*
 * This allows serving SSR pages rendered by Payload/Next.js (if that's what's running there)
 * or simply ensures the CMS frontend routes are accessible under the same domain.
 */

export const onRequest: PagesFunction = async (context) => {
    const { request } = context;
    const url = new URL(request.url);

    // Target: https://soninewmedia.com/transmissions/...
    const targetUrl = new URL(url.pathname, 'https://soninewmedia.com');
    targetUrl.search = url.search;

    const newRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow',
    });

    try {
        const response = await fetch(newRequest);
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    } catch (err) {
        return new Response(`Error proxing transmission: ${err}`, { status: 502 });
    }
};

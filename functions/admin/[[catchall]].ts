/**
 * Admin Proxy Function
 * 
 * Proxies requests from /admin/* to the Payload CMS Admin panel.
 */

export const onRequest: PagesFunction = async (context) => {
    const { request } = context;
    const url = new URL(request.url);

    // Target: https://soni-cms.soniglf.workers.dev/admin/...
    const targetUrl = new URL(url.pathname, 'https://soni-cms.soniglf.workers.dev');
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
        return new Response(`Error proxing admin: ${err}`, { status: 502 });
    }
};

function solution(word, pages) {
    const getUrl = (page) =>
        /<meta property="og:url" content="(https:\/\/\S+)"\/>/gim.exec(page)[1];
    const getAtags = (page) => {
        const aTags = page.match(/<a href="https:\/\/\S+">/gim);
        return aTags ? aTags.map((tag) => tag.slice(9, tag.length - 2)) : [];
    };
    const getBasic = (page, word) =>
        page.split(/[^a-zA-Z]/g).filter((item) => item.toLowerCase() === word)
            .length;

    const map = new Map();

    return pages
        .map((page, idx) => {
            const url = getUrl(page);
            const links = getAtags(page);
            const basic = getBasic(page, word.toLowerCase());

            map.set(url, (map.get(url) || 0) + basic);

            links.forEach((link) => {
                map.set(link, (map.get(link) || 0) + basic / links.length);
            });

            return [url, idx];
        })
        .sort((a, b) => map.get(b[0]) - map.get(a[0]))[0][1];
}

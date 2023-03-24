export const parsePattern = (pattern) => {

    const parsed = [];
    const helper = [];
    const center = {};

    for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
            const tile = pattern[y][x];
            if (tile === '1') {
                helper.push({
                    x,
                    y,
                })
            } else if (tile === 'x') {
                center.x = x;
                center.y = y;
            }
        }
    }

    for (const tile of helper) {
        parsed.push({
            x: tile.x - center.x,
            y: tile.y - center.y,
        })
    }

    return parsed;

}
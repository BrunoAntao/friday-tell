import { pattern1, pattern2 } from "./patterns.js";
import { parsePattern } from "./patternParser.js";
import { processTurn } from "./processTurn.js";

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement('canvas');
    canvas.width = 32 * 18;
    canvas.height = 32 * 18;
    const ctx = canvas.getContext('2d');
    document.body.append(canvas);

    const boundingClientRect = canvas.getBoundingClientRect();

    const palette = ["#63580e", "#3b588d", "#921d2d"];
    const patterns = [pattern1, pattern2, pattern2];
    const patterns2 = [pattern1, pattern2, pattern2];
    const colors = ['#33cc3355', '#cc333355', '#ffffff55'];
    const attack = [3, 1, 5];

    const sprite = new Image();
    sprite.src = './assets/grass.png';

    const offset = { x: 32, y: 32 };
    const tiles = [];

    for (let x = 0; x < 16; x++) {
        tiles[x] = [];
        for (let y = 0; y < 16; y++) {
            tiles[x][y] = {
                position: { x, y },
            }
        }
    }

    let currentTurn = 1;

    const entities = [];

    canvas.addEventListener('contextmenu', e => {

        e.preventDefault();

    })

    for (let p = 0; p < 2; p++) {
        for (let e = 0; e < 3; e++) {
            entities.push({
                player: p,

                hp: 10,

                m: 99,
                mMax: 1,
                a: 99,
                aMax: 1,

                attack: attack[e],

                position: {
                    x: 6 + e,
                    y: p * 15
                },
                color: palette[e],
                pattern: parsePattern(patterns[e]),
                pattern2: parsePattern(patterns2[e]),

            })
        }
    }

    window.nextTurn = () => {

        for (const entity of entities) {
            entity.m = entity.mMax;
            entity.a = entity.aMax;
        }

        currentTurn = +!currentTurn;

        if (currentTurn === 0) {

            processTurn(entities, colors, offset);
            currentTurn = +!currentTurn;

        }

    }

    let overlay = [];

    const mouse = {
        x: 0,
        y: 0
    }

    document.body.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })

    let selected = null;

    document.body.addEventListener("mousedown", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const x = cursor.x / 32 - 1;
        const y = cursor.y / 32 - 1;

        let moved = false;

        if (e.button === 0) {

            for (const over of overlay) {
                if (over.position.x === x &&
                    over.position.y === y
                ) {
                    if (over.color === colors[0]) {
                        selected.position.x = x;
                        selected.position.y = y;
                        selected.m--;
                        moved = true;
                    } else if (over.color === colors[1]) {

                        let target = null;

                        for (const entity of entities) {
                            if (entity.position.x === over.position.x &&
                                entity.position.y === over.position.y) {
                                target = entity;
                            }
                        }

                        target.hp -= selected.attack;

                        if (target.hp <= 0) {
                            entities.splice(entities.indexOf(target), 1);
                            const enemyEntities = [];
                            for (const entity of entities) {
                                if (entity.player === 0) {
                                    enemyEntities.push(entity);
                                }
                            }
                            if (enemyEntities.length === 0) {
                                console.log('you win');
                            }
                        }

                        selected.a--;
                    }
                }
            }

            if (!moved) {

                selected = null;

                for (const entity of entities) {
                    if (entity.position.x === x &&
                        entity.position.y === y &&
                        entity.player === 1) {
                        selected = entity;
                    }
                }

                if (selected && selected.m > 0) {

                    overlay = [];

                    for (const tile of selected.pattern) {

                        let isFriend = false;
                        let isEnemy = false;

                        for (const entity of entities) {

                            if (entity.position.x === selected.position.x + tile.x &&
                                entity.position.y === selected.position.y + tile.y) {
                                if (entity.player === selected.player) {
                                    isFriend = true;
                                } else {
                                    isEnemy = true;
                                }
                            }
                        }

                        if (!isFriend) {

                            overlay.push({
                                position: {
                                    x: selected.position.x + tile.x,
                                    y: selected.position.y + tile.y
                                },
                                color: isEnemy ? colors[1] : colors[0]
                            })

                        }
                    }

                } else {
                    overlay = [];
                }

            } else {
                overlay = [];
            }

        } else if (e.button === 2) {

            for (const entity of entities) {
                if (entity.position.x === x &&
                    entity.position.y === y &&
                    entity.player === 1) {
                    selected = entity;
                }
            }
            if (!moved) {

                selected = null;

                for (const entity of entities) {
                    if (entity.position.x === x &&
                        entity.position.y === y &&
                        entity.player === 1) {
                        selected = entity;
                    }
                }

                if (selected && selected.a > 0) {

                    overlay = [];

                    for (const tile of selected.pattern2) {

                        let isFriend = false;
                        let isEnemy = false;

                        for (const entity of entities) {

                            if (entity.position.x === selected.position.x + tile.x &&
                                entity.position.y === selected.position.y + tile.y) {
                                if (entity.player === selected.player) {
                                    isFriend = true;
                                } else {
                                    isEnemy = true;
                                }
                            }
                        }

                        if (!isFriend) {

                            overlay.push({
                                position: {
                                    x: selected.position.x + tile.x,
                                    y: selected.position.y + tile.y
                                },
                                color: isEnemy ? colors[1] : colors[2]
                            })

                        }
                    }

                } else {
                    overlay = [];
                }

            } else {
                overlay = [];
            }

        }

        console.log(selected);
    })

    const cursor = { x: -32, y: -32 };

    const drawGrid = () => {

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;

        for (let x = 0; x < 17; x++) {

            ctx.moveTo(offset.x + x * 32, offset.y);
            ctx.lineTo(offset.x + x * 32, offset.y + 16 * 32);
            ctx.stroke();

        }

        for (let y = 0; y < 17; y++) {

            ctx.moveTo(offset.x, offset.y + y * 32);
            ctx.lineTo(offset.x + 16 * 32, offset.y + y * 32);
            ctx.stroke();

        }

    }

    const fps = 0;

    const draw = () => {

        ctx.fillStyle = "#212121";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cursor.x = -32;
        cursor.y = -32;

        for (let x = 0; x < tiles.length; x++) {
            for (let y = 0; y < tiles[x].length; y++) {
                const tile = tiles[x][y];

                ctx.drawImage(sprite, offset.x + x * 32, offset.y + y * 32, 32, 32);

                if (mouse.x > tile.position.x * 32 + offset.x && mouse.x < tile.position.x * 32 + 32 + offset.x &&
                    mouse.y > tile.position.y * 32 + offset.y && mouse.y < tile.position.y * 32 + 32 + offset.y) {

                    cursor.x = tile.position.x * 32 + offset.x;
                    cursor.y = tile.position.y * 32 + offset.y;

                }

            }
        }

        for (const entity of entities) {

            ctx.fillStyle = entity.color;
            ctx.fillRect(
                entity.position.x * 32 + 8 + offset.x,
                entity.position.y * 32 + 8 + offset.y,
                16, 16);

        }

        for (const over of overlay) {

            ctx.fillStyle = over.color;
            if (over.position.x * 32 + offset.x > 0 &&
                over.position.x * 32 + offset.x < 17 * 32 &&
                over.position.y * 32 + offset.y > 0 &&
                over.position.y * 32 + offset.y < 17 * 32) {
                ctx.fillRect(
                    over.position.x * 32 + offset.x,
                    over.position.y * 32 + offset.y,
                    32, 32);
            }

        }

        ctx.lineWidth = 2;
        ctx.strokeRect(cursor.x, cursor.y, 32, 32);

        requestAnimationFrame(draw);

    }

    requestAnimationFrame(draw);

})
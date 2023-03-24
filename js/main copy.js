import { pattern1, pattern2 } from "./patterns.js";
import { parsePattern } from "./patternParser.js";
import { processTurn } from "./processTurn.js";

document.addEventListener("DOMContentLoaded", () => {

    let currentTurn = 1;

    const entities = [];

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

    let selected = null;

    const draw = () => {

        requestAnimationFrame(draw);

    }

    requestAnimationFrame(draw);

})
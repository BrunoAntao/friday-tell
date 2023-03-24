const distance = (p1, p2) => {
    let a = p1.x - p2.x;
    let b = p1.y - p2.y;

    return Math.sqrt(a * a + b * b);
}

export const processTurn = (entities, colors, offset) => {

    const playerEntities = [];
    const enemyEntities = [];

    for (const entity of entities) {
        if (entity.player === 0) {
            playerEntities.push(entity);
        } else {
            enemyEntities.push(entity);
        }
    }

    const selectedEntity = playerEntities[Math.floor(Math.random() * playerEntities.length)];

    // const closest = enemyEntities.reduce((a, b) =>
    //     distance(selectedEntity.position, a.position) <
    //         distance(selectedEntity.position, b.position) ? a : b);

    // console.log(closest);

    const movePositions = [];
    const attackPositions = [];

    for (const tile of selectedEntity.pattern) {

        let isFriend = false;
        let isEnemy = false;

        for (const entity of entities) {

            if (entity.position.x === selectedEntity.position.x + tile.x &&
                entity.position.y === selectedEntity.position.y + tile.y) {
                if (entity.player === selectedEntity.player) {
                    isFriend = true;
                } else {
                    isEnemy = true;
                }
            }
        }

        if (!isFriend) {

            const termpPosition = {

                x: selectedEntity.position.x + tile.x,
                y: selectedEntity.position.y + tile.y
            }

            if (termpPosition.x * 32 + offset.x > 0 &&
                termpPosition.x * 32 + offset.x < 17 * 32 &&
                termpPosition.y * 32 + offset.y > 0 &&
                termpPosition.y * 32 + offset.y < 17 * 32) {

                if (!isEnemy) {
                    movePositions.push({
                        position: termpPosition,
                        color: isEnemy ? colors[1] : colors[0]
                    })
                }

            }

        }
    }

    const selectedPosition = movePositions[Math.floor(Math.random() * movePositions.length)];

    selectedEntity.position.x = selectedPosition.position.x;
    selectedEntity.position.y = selectedPosition.position.y;

}
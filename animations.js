export const createAnimations = (game) => {
    game.anims.create({
        key : 'mario-run',
        frames: game.anims.generateFrameNumbers(
            'mario', { start: 3, end: 2}),
            frameRate: 12,
            repeat: -1
    })

    game.anims.create({
        key : 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }]
    })

    game.anims.create({
        key : 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }]
    })
    
    game.anims.create({
        key : 'mario-dead',
        frames: [{ key: 'mario', frame: 4 }]
    })
}
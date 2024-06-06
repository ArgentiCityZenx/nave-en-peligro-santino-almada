controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 8 . . . . . . . 
        . . . . . . 8 8 8 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . 8 8 8 . . . . . . . 
        . . . . . . 8 8 8 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, nave, 0, -140)
    projectile.startEffect(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let nave: Sprite = null
let asteroides = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . e e e e e e e e e . . . . 
    . . e e e d e e e e e e e . . . 
    . e e e e e e e e e e e e e . . 
    . e e e e e e e e e e e e e . . 
    . e e e e e e e e e e e e e . . 
    . e e e e e e e e e e e e e . . 
    . e e e e e e e e e e e e e . . 
    . e e e e e e e e e e e e e . . 
    . e e e d e e e e d e e e e . . 
    . . e e e e e e e e e e e . . . 
    . . . e e e e e e e e e . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . e e e e e e e e e . . . . 
    . . e e e e e e e e e e e . . . 
    . . e e d e e e e e e d e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . . e e d e e e e e e . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . e e e e e e e e e . . . . 
    . . . e e e d e e e e e . . . . 
    . . . e e e e e e e e e . . . . 
    . . . e e e e e e e e e . . . . 
    . . . e e e e e e e e e . . . . 
    . . . e e e e e e e d e . . . . 
    . . . e e d e e e e e e . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . e e e e e . . . . . . 
    . . . . e e d e e e e . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . e e e e d e e . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . e e d e e e e . . . . . 
    . . . . . e e e e e . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
nave = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 8 8 8 . . . . . . . 
    . . . . . 8 1 1 1 8 . . . . . . 
    . . . . 8 1 8 8 8 1 8 . . . . . 
    . . . . 8 1 5 5 5 1 8 . . . . . 
    . . . . 8 1 8 8 8 1 8 . . . . . 
    . . . . 8 8 1 1 1 8 8 . . . . . 
    . . . . 8 8 8 8 8 8 8 . . . . . 
    . . . . 8 8 8 8 8 8 8 . . . . . 
    . . . . 8 8 8 5 8 8 8 . . . . . 
    . . . . 8 8 5 5 5 8 8 . . . . . 
    . . . . 8 8 5 5 5 8 8 . . . . . 
    . . . . 8 8 5 5 5 8 8 . . . . . 
    . . . . . 8 . . . 8 . . . . . . 
    `, SpriteKind.Player)
nave.setStayInScreen(true)
nave.bottom = 0
controller.moveSprite(nave, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect(500)
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroides[randint(0, asteroides.length - 1)], 50, 50)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})

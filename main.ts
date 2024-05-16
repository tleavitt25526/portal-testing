namespace SpriteKind {
    export const Yellow = SpriteKind.create()
    export const Purple = SpriteKind.create()
}

// Create both portals and set their positions.
let yellowPortal = sprites.create(assets.image`yellowPortal`, SpriteKind.Yellow);
yellowPortal.x = 40;
yellowPortal.z = 10;
let purplePortal = sprites.create(assets.image`purplePortal`, SpriteKind.Purple);
purplePortal.x = 110;
purplePortal.z = 10;

// Create the player sprite.
let playerSprite1 = sprites.create(assets.image`playerImage`, SpriteKind.Player);
let playerSprite2 = sprites.create(assets.image`playerImage`, SpriteKind.Player);
let currentSprite = 1;
controller.moveSprite(playerSprite1);
controller.moveSprite(playerSprite2);
let collision = false;

events.spriteEvent(SpriteKind.Player, SpriteKind.Purple, events.SpriteEvent.StartOverlapping, function(sprite: Sprite, otherSprite: Sprite) {
    if (!collision) {
        collision = true;
        if (currentSprite == 1) {
            let dif = playerSprite1.x - purplePortal.x
            playerSprite2.x = yellowPortal.x + dif;
        } else {
            let dif = playerSprite2.x - purplePortal.x
            playerSprite1.x = yellowPortal.x + dif;
            
        }
    }
});
events.spriteEvent(SpriteKind.Player, SpriteKind.Purple, events.SpriteEvent.StopOverlapping, function (sprite: Sprite, otherSprite: Sprite) {
    if (collision) {
        if (controller.dx() < 0) {
            collision = false;
            if (currentSprite == 1) {
                currentSprite = 2;
                playerSprite1.setPosition(playerSprite2.x, playerSprite2.y);
            } else {
                currentSprite = 1;
                playerSprite2.setPosition(playerSprite1.x, playerSprite1.y);
            }
        } else {
            currentSprite = 1;
            playerSprite2.setPosition(playerSprite1.x, playerSprite1.y);
        }
    }
})

events.spriteEvent(SpriteKind.Player, SpriteKind.Yellow, events.SpriteEvent.StartOverlapping, function (sprite: Sprite, otherSprite: Sprite) {
    if (!collision) {
        collision = true;
        if (currentSprite == 1) {
            let dif = playerSprite1.x - yellowPortal.x
            playerSprite2.x = purplePortal.x + dif;
        } else {
            let dif = playerSprite2.x - yellowPortal.x
            playerSprite1.x = purplePortal.x + dif;

        }
    }
})
events.spriteEvent(SpriteKind.Player, SpriteKind.Yellow, events.SpriteEvent.StopOverlapping, function (sprite: Sprite, otherSprite: Sprite) {
    if (collision) {
        if (controller.dx() > 0) {
            collision = false;
            if (currentSprite == 1) {
                currentSprite = 2;
                playerSprite1.setPosition(playerSprite2.x, playerSprite2.y);
            } else {
                currentSprite = 1;
                playerSprite2.setPosition(playerSprite1.x, playerSprite1.y);
            }
        } else {
            currentSprite = 1;
            playerSprite2.setPosition(playerSprite1.x, playerSprite1.y);
        }
    }
})


/*
My thinking for the portal is to have two seperate sprites when you come in contact with a portal.
Both will be considered for movement, and one will be deleted when you stop touching both portals.
At some point, I will have code to change the image to make it seem they are peeking though, but not now.

Not sure what the best look for the portals is. I want to try 2 wide, but an even number might mess with some math.

I've decided that this game won't be exactly like portal 1/2. There will be one portal for the left side, and one portal
for the right. They will be yellow and purple.

Purple = LEFT
Yellow = RIGHT

This is weird. If a sprite's height is bigger than the player, it will NOT sense collision if they are on the same y.
This bug is confirmed, as long as they aren't the same height but on the same height, THEY WILL NOT sense any collision,
regardless of what extension or method I use to test it. Very strange that this bug has lived for so long.
*/

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    playerSprite1.y = 60;
    playerSprite2.y = 60
})
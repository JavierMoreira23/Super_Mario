
const config ={
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

new Phaser.Game(config);

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )


    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

    
}

function create() {
    this.add.image(100, 50, 'cloud1').setScale(0.15)

    this.floor = this.physics.add.staticGroup()
    this.floor.create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()

    this.floor.create(150,config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()
    
    //this.mario = this.add.sprite(50, 210, 'mario').setOrigin(0, 1)
    this.mario = this.physics.add.sprite(50, 210, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(420)
    
    this.physics.world.setBounds(0,0,2000, config.height)
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)       

    this.anims.create({
        key : 'mario-run',
        frames: this.anims.generateFrameNumbers(
            'mario', { start: 3, end: 2}),
            frameRate: 12,
            repeat: -1
    })

    this.anims.create({
        key : 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }]
    })

    this.anims.create({
        key : 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }]
    })


    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.keys.left.isDown){
        this.mario.anims.play('mario-run',true)
        this.mario.x -=2
        this.mario.flipX = true
    } else if (this.keys.right.isDown){
        this.mario.x +=2
        this.mario.anims.play('mario-run',true) 
        this.mario.flipX = false
    } else {
        this.mario.anims.play('mario-idle',true)
    }

    if(this.keys.up.isDown && this.mario.body.touching.down){
        this.mario.setVelocityY(-295)
        this.mario.anims.play('mario-jump',true)
    
    }
}
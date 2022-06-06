function preload() {
  
    //this.load.image('protagonista', 'assets/prota.png');
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('protagonista_andando', 
        'assets/protai.png',
        { frameWidth: 47, frameHeight: 64 }
    );

   this.load.spritesheet('protagonista_andando_tras', 
        'assets/prota_andando_tras.png',
        { frameWidth: 52, frameHeight: 64 }
    );
	
  this.load.spritesheet('protagonista_atacando',                  'assets/protaiii.png',                
	{frameWidth:65, frameHeight: 64}
		);
  this.load.spritesheet('protagonista_dano',                  'assets/prota_dano.png',                
	{frameWidth:45, frameHeight: 64}
	);
	  this.load.spritesheet('protagonista_pulando',                  'assets/prota_pulando.png',                
	{frameWidth:45, frameHeight: 64}
	);
	
}

function create() {
this.x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
	
    //add images
    this.add.image(100,100, 'background').setScale(1, 1);
    //this.cameras.main.setBounds(0, 0, 3392, 100);
    this.cameras.main.setBounds(0, 0, 800 * 2, 150);
    for (let x = 0; x < 4; x++)
   {
          this.add.image(1500 * x, 0,      'background').setOrigin(0);
   }

  
    this.physics.world.setBounds(0, 0, 3392, 240);
    player = this.physics.add.sprite(50, 100, 'protagonista_andando');

    this.cameras.main.startFollow(player, true);
    this.cameras.main.setZoom(1);
  
  
 // Animation set
  this.anims.create({
    key: 'left',
    frames:        this.anims.generateFrameNumbers('protagonista_andando_tras', {     start: 0, end: 2 }),
    frameRate: 6,
    repeat: -1
});
  this.anims.create({
    key: 'turn',
    frames: [ { key: 'protagonista_andando', frame: 0 } ],
    frameRate: 10
});
 this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('protagonista_andando', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
this.anims.create({
    key: 'x',
    frames:        this.anims.generateFrameNumbers('protagonista_atacando', {     start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1
});
}

function update() {
   const cam = this.cameras.main;
  if (this.moveCam)
        {
            if (this.cursors.left.isDown)
            {
                cam.scrollX -= 4;
            }
            else if (this.cursors.right.isDown)
            {
                cam.scrollX += 4;
            }

            if (this.cursors.up.isDown)
            {
                cam.scrollY -= 4;
            }
            else if (this.cursors.down.isDown)
            {
                cam.scrollY += 4;
            }
        }
  else{
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
		else if(this.x.isDown){
			player.anims.play('x', true);
		}
			
    else 
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
  }
}  

var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 150,
    scale:{
      mode:Phaser.Scale.FIT
    },
  
    backgroundColor: '#ceedeb',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var moveCam = false;
var game = new Phaser.Game(config);
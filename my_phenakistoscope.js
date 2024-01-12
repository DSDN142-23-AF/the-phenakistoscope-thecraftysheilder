const SLICE_COUNT = 10;

function setup_pScope(pScope){
  pScope.output_mode(OUTPUT_PRINT(A3));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope){

  new PLayer(null, 255,0,255);  //lets us draw the whole circle background, ignoring the boundaries
//default pscope code
  var layer1 = new PLayer(squares);
  layer1.mode( SWIRL(10) );
  layer1.set_boundary( 200, 1000 );
  //takes the effect used to make the border in the base program and swirls it for a cool effect
  var layer2 = new PLayer(faces);
  layer2.mode( RING );
  layer2.set_boundary( 0, 400 );
  //this uses the default face system but replaced with something i made myself, this swirls it due to some tricks with it being off center

  var layer3 = new PLayer(faces);
  layer3.mode( SWIRL(1) );
  layer3.set_boundary( 0, 800 );
  //this also creats a seccond, almost but not quite overlaping swirl

  var layer4 = new PLayer(center);
  layer4.mode( RING );
  layer4.set_boundary( 200, 400 );
  //this just puts a dot in the center
}

function faces(x, y, animation, pScope){
  colorMode(HSB,255);
  let hue=animation.frame*255;
  //rainbowssssssssssssssssssssssssssssss
  scale(animation.frame*4);
  let rotate=Math.PI/12;
  let rotateAdd=Math.PI*100;
  //for some reason in the pscope rotateadd needs to be difrent from in normal programs
  fill(0,0,0);
  stroke(0,0,0);
  var distance =50;
  var base=200;
  var size=50;
  //this controls the offset and size paramiters
  for (var i=0;i<9;i++){
    ellipse(base+distance*(cos(Math.PI+rotate)), base+distance*(sin(Math.PI+rotate)), size, size);
    ellipse(base+distance*(cos(rotate)), base+distance*(sin(rotate)), size, size);
    ellipse(base+distance*(cos((Math.PI/2)+rotate)), base+distance*(sin((Math.PI/2)+rotate)), size, size);
    ellipse(base+distance*(cos(((3*Math.PI)/2)+rotate)), base+distance*(sin(((3*Math.PI)/2)+rotate)), size, size);
   rotate+=rotateAdd;
  }
  //this does the dotty fur
  fill(hue,255,255);
  ellipse(base,base,size*1.8,size*1.8);
  fill(0,0,0);
  ellipse(base-size/3,base-size/3,size/2.5,size/2.5);
  ellipse(base+size/3,base-size/3,size/2.5,size/2.5);
  //this creates the head and eyes
  //ellipse(base,base+size/3,size/6,size/6);
  rotate=0;
  rotateAdd=7.5;
  for (var i=0;i<24;i++){
    ellipse(base+(distance/3)*(cos(rotate)), base+distance/6+(distance/3)*(sin(rotate)), size/6, size/6);
   rotate+=rotateAdd;
  }
  //this creates the smile curve, i used dots to make it look rounder
  for (var i=0;i<24;i++){
    ellipse(base-(distance/3)+(i*distance/(1.5*24)), base+(distance/6), size/6, size/6);
  }
  //this creates the smile line
  fill(hue,255,255);
  ellipse(base-size/3+size/24,base-size/3,size/7.5,size/7.5);
  ellipse(base+size/3+size/24,base-size/3,size/7.5,size/7.5);
  //this puts the little dots into the eyes
}

function squares(x, y, animation, pScope){

  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 700 - angleOffset;
  let backgroundArcEnd = 700 + angleOffset;

  fill(0, 0, 255)
  arc(x,y,800,800,backgroundArcStart,backgroundArcEnd); // draws "pizza slice" in the background

  fill(255,255,0)
  stroke(255,255,0);
  rect(-10,-300-animation.wave()*50,200,200) // .wave is a cosine wave btw
  //this was stolen straight from the original program
}
function center(x, y, animation, pScope){
  scale(animation.frame*2);
  fill(255,255,0);
  stroke(255,255,0);
  ellipse(0,0,50,50); // draws a little dot in the center
  
}

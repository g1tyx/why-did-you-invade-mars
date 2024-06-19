var version = "0.1";
var savefile_name = "Why did you invade Mars? "+version;

var debug_nosave=0;

var prestige = {
  restarts:0,
  trees_as_offer:0,
  trees_power:2,
  starting_troopers:0,
  min_trees_price:10,
  min_waves_price:1,
  undead_inc:1
};
var player = {};

var settings = {
  scientific:0,
  audio_mute:0,
  audio_volume:0.5
}
var game={};

//variables that are constants, unsaved defaults or are derived from saved variables
const SYSTEMFRAME_MAX=100;
const MAX_TROOPERS=80;
const FINAL_MONSTER=24;
var current_rate;
var misc_settings={
  settings_toggle:0,
  save_del_confirm_toggle:0
}
var session_data={
  //session data is not saved
  audio_initiated:0,
  save_frame:0,
  fire_allowed:1,
  main_loop:null,
  win_level_timeout:null,
  hover_over_bar:0
};

var monsters_metadata=[
  //id/filename,name,description
  [0,"",""],
  [1,"Lizardbrain","It does actually have a brain"],
  [2,"Crabdusk","Like a crab, only different"],
  [3,"Rockin' Toothface","A mild danger to society"],
  [4,"Roboeye","He's watching you"],
  [5,"Elephprog","Tough and unfair"],
  [6,"Burning Dog",'What "This is fine dog" eventually turns into'],
  [7,"Engineer","He sciences the shit out of it"],
  [8,"Average Martian","But he thinks he's a genius, of course"],
  [9,"Rolltack","It has no stop button"],
  [10,"Martian Cyborg","Same as a cyborg, only from Mars"],
  [11,"Martian Robocyborg","Even more gadgets"],
  [12,"Dragonbust","Will bust your chops"],
  [13,"Blipy","Incessantly annoying"],
  [14,"Martitruck","Stuck and furious!"],
  [15,"Grudbuck","An almost ordinary crustacean, roaming the depths and hunting for unsuspecting invaders"],
  [16,"Roboflick","Everyone's boss"],
  [17,"Roboflick's Shuttle","Badly hurt, Roboflick tries to escape"],
  [18,"Martian Probe","Leftover AI system"],
  [19,"Martian Observer","Left on the planet to spy on the invaders"],
  [20,"The Real Boss","The sturdiest lifeform on the planet, bwahaha"],
  [21,"Karate Kid aka Martial Arts Luke","The last stand of Mars, he uses the Force"],
  [22,"Luke's Father","He stands up for his son"],
  [23,"A Forgotten Megatank","The crew refuses to surrender"],
  [24,"The Real Martian","You've been lied to, the real martians have just one eye"]
];


//some ideas for new versions
//1. Add unique items based on the monster at which one restarts. Due to the growing power, the players will tend to restart at the next monster, which will ensure a roster of new items each time.
//2. Trees might be used to build something else and veer the game into a new direction. Or it could be a meta-presige thing, when you gain the ability to build houses or something like that.
//try making troopers less blured. I blured them to make the image look softer, but on browser zoom they look too muddy compared to the rest
//move the offers our of the powerUpgrade function into a separate one


function commonInit(){
  //inits that are relevant to both init() and loadGame()
  Howler.volume(settings.audio_volume);//default volume
}
function setupPlayer(){
  player = {
    power:1,
    base_power:1,
    power_level:1,
    level:1,
    restarts:0,//add +5% to the Upgrade Goal
    cheaper_restarts:0,//add +1% to the UG
    free_restarts:0,//add +0% to the UG
    fire_pressed:0,
    fire_allowed:1,
    mon_max_hp:10,
    mon_hp_percent:0,
    base_power_goal:5,
    power_goal:5,
    power_counter:0,
    power_ratio:0,
    power_upgrade_amount:0,
    power_can_upgrade:0,
    troopers:0,
    troopers_power:1,
    offer_is_available:0,
    offer_target:0,
    offers:[1,0,0,0,0,0,0,0,0,0],
    dice_range:[1,0],
    message:0,//0 - no message, number - message is on and also id of message, which determines both the message and what's supposed to happen when you press OK
    read_messages:[],
    bonuses:[0,0,0,0,0],
    trees:0,
    undead:0,
    undead_power:1,
    undead_tree_base_price:10,
    undead_trees:0,
    undead_wave_base_price:1,
    undead_waves:0,
    undead_bomb_base_price:1,
    undead_bombs:0
  };

  player.undead_tree_base_price=prestige.min_trees_price;
  player.undead_wave_base_price=prestige.min_waves_price;
  player.troopers=prestige.starting_troopers;

}
function setupGame(){

  if(player.level==FINAL_MONSTER+1){
    player.level=0;
    endGame();
  }

  game={
    mon_hp:0
  };

  //this has to be a recursive formula, otherwise we would need to calculate a factorial each time
  //because the formula would be new_max=INIT_HP*(player.level!) and that would become too expensive
  player.mon_max_hp=player.mon_max_hp*player.level;
  game.mon_hp=player.mon_max_hp;

}
function setupBonuses(){

  //plant a tree
  if(prestige.trees_as_offer==1){
    if(getRandomInt(0,1)==1){player.bonuses[0]=1;}else{player.bonuses[0]=0;}
  }else{
    if(getRandomInt(0,5)==5){player.bonuses[0]=1;}else{player.bonuses[0]=0;}
  }

  //reduce tree price
  if(player.undead_trees>9 && getRandomInt(0,1)==1){player.bonuses[1]=1;}else{player.bonuses[1]=0;}

  //reduce wave price
  if(player.undead_waves>8 && player.undead<20 && getRandomInt(0,1)==1){player.bonuses[2]=1;}else{player.bonuses[2]=0;}

  //+5 undead
  if((player.restarts+player.cheaper_restarts)>10 && getRandomInt(0,5)==5){player.bonuses[3]=1;}else{player.bonuses[3]=0;}

  //+25 undead
  if((player.restarts+player.cheaper_restarts)>10 && getRandomInt(0,5)==5){player.bonuses[4]=1;}else{player.bonuses[4]=0;}

}
function restartGame(type=1){

  clearTimeout(session_data.win_level_timeout);
  
  if(type==1){player.restarts++;}  
  if(type==2){player.cheaper_restarts++;}
  if(type==3){player.free_restarts++;}

  player.power=player.base_power*player.power_level;
  ugCalc();
  
  player.level=1;
  player.mon_max_hp=10;

  player.power_counter=0;
  player.power_ratio=0;
  player.power_upgrade_amount=0;
  player.offer_is_available=0;
  player.power_can_upgrade=0;
  player.offer_target=0;
  player.show5troopers=0;

  session_data.fire_allowed=1;
  

  setupGame();
  refreshUI();
  storeState();
  rateCalc();

  

}
function endGame(){

  selectors.get('#intro_block').hide();
  selectors.get('#loadgame_block').hide();
  selectors.get('#endgame_block').show();
  selectors.get('#all').hide();

  selectors.get('#prestige_table').hide();

  clearTimeout(session_data.win_level_timeout);session_data.win_level_timeout=null;
  clearInterval(session_data.main_loop);session_data.main_loop=null;

}
function prestigeGame(){

  prestige.restarts++;

  selectors.get('#intro_block').hide();
  selectors.get('#loadgame_block').hide();
  selectors.get('#endgame_block').hide();
  selectors.get('#all').show();

  setupPlayer();
  setupGame();
  ugCalc();
  rateCalc();
  storeState();
  refreshUI();

  session_data.main_loop=setInterval(calc, 50);
}

//main loop
function calc(){

  let contribution=[0,0];//document whether the damage was passive, active or both

  if(session_data.fire_allowed==1){

    if(current_rate>0){

      contribution[0]=1;

      powerUpgrade(current_rate);
      game.mon_hp-=current_rate;
  
    }
  
    if(player.fire_pressed==1 && session_data.fire_allowed==1){

      contribution[1]=1;
  
      powerUpgrade(player.power);
      game.mon_hp-=player.power;

      if(game.mon_hp>0){playAudio(5);}
  
    }

    if(player.level==16 && player.mon_hp_percent<=10 && player.mon_hp_percent>0){
      if(inArray(1,player.read_messages)){game.mon_hp=0;}else{
        clearInterval(session_data.main_loop);session_data.main_loop=null;
        player.message=1;playAudio(3);refreshUI();
      }
    }

    if(game.mon_hp<=0){

      let delay=1000;

      //console.log(contribution);

      if(contribution[0]==1){if(current_rate>=player.mon_max_hp){
        player.undead+=prestige.undead_inc;delay=500;
        storeState();
        refreshUI(); }}
      //to ensure that if troopers are too weak, you can still get some undead by manually killing the monsters
      if(contribution[1]==1 && current_rate<player.mon_max_hp){if(player.power>=player.mon_max_hp){
        player.undead+=prestige.undead_inc;delay=500;
        storeState();
        refreshUI(); }}
  
      game.mon_hp=0;
      session_data.fire_allowed=0;
      playAudio(2);
      session_data.win_level_timeout=setTimeout(function (){player.level++; setupGame(); refreshUI(); session_data.fire_allowed=1;}, delay);

    }

    updateCounters();

  }//if(session_data.fire_allowed==1)

  

  
  
  session_data.save_frame+=1;
  if(session_data.save_frame>SYSTEMFRAME_MAX){
    session_data.save_frame=0;
    if(debug_nosave==0){saveGame();}
  }

}
function updateCounters(){

  if( session_data.save_frame%10==0 ){storeState();}

  //selectors.get('#power_upgrade_label').text(player.power_ratio+'%');
  progressBarRatio(selectors.get('#pb_ratio'),player.power_ratio);

  progressBarMon(selectors.get('#pb_enemy'),game.mon_hp);

  if(game.mon_hp>0){
    selectors.get('#mon_image').html('<img src="img/monsters/'+monsters_metadata[player.level][0]+'.gif">');
  }else{
    selectors.get('#mon_image').html('<img src="img/death.png">');
  }


  if(session_data.hover_over_bar==1){
    selectors.get('#monster_info').html('This bar shows how close we are to the Restart Goal<br>In absolute numbers: '+numT(player.power_counter)+'/'+numT(player.power_goal*100));
  }

  

}

function storeState(){

  if(player.power_ratio<100){
    selectors.get('#restart_button').prop('disabled', true);
  }else{
    selectors.get('#restart_button').prop('disabled', false);
  }

  if(player.power_ratio<100){
    selectors.get('#offer_button').prop('disabled', true);
  }else{
    selectors.get('#offer_button').prop('disabled', false);
  }

  if(player.undead-(player.undead_tree_base_price+player.undead_trees)<0){
    selectors.get('#undead_to_trees').prop('disabled', true);
  }else{
    selectors.get('#undead_to_trees').prop('disabled', false);
  }

  if(player.undead-(player.undead_wave_base_price+player.undead_waves)<0){
    selectors.get('#undead_wave').prop('disabled', true);
  }else{
    selectors.get('#undead_wave').prop('disabled', false);
  }

}
function refreshUI(){

  updateCounters();

  let trees_effect=100-Math.pow(1-prestige.trees_power*0.01,player.trees)*100;
  let rgg=(Math.pow(1.05,player.restarts)*Math.pow(1.01,player.cheaper_restarts)*100)-100;
  let rgg_comp=Math.pow(1.05,player.restarts)*Math.pow(1.01,player.cheaper_restarts)*Math.pow(1-prestige.trees_power*0.01,player.trees) * 100 - 100;

  selectors.get('#rgg_label').text(numT(rgg)+"%");
  selectors.get('#rgg_comp_label').text(numT(rgg_comp)+"%");

  selectors.get('#power_label').html(numT(player.power));
  if(player.power_ratio>=100){
    selectors.get('#upgrade_amount_label').text(' x '+player.power_upgrade_amount);
  }else{
    selectors.get('#upgrade_amount_label').text('');
  }


  //bonuses

  if(player.bonuses[0]==1){
    selectors.get('#reduce_goal').show();
  }else{
    selectors.get('#reduce_goal').hide();
  }

  if(player.bonuses[1]==1){
    selectors.get('#reduce_tree_price').show();
  }else{
    selectors.get('#reduce_tree_price').hide();
  }

  if(player.bonuses[2]==1){
    selectors.get('#reduce_wave_price').show();
  }else{
    selectors.get('#reduce_wave_price').hide();
  }

  if(player.bonuses[3]==1){
    selectors.get('#add_5_undead').show();
  }else{
    selectors.get('#add_5_undead').hide();
  }

  if(player.bonuses[4]==1){
    selectors.get('#add_25_undead').show();
  }else{
    selectors.get('#add_25_undead').hide();
  }


  if(player.power_ratio>=100 && inArray(1,player.bonuses)){selectors.get('#special_bonuses_block').show();}
  else{selectors.get('#special_bonuses_block').hide();}



  if(player.offer_is_available==0){ selectors.get('#offer_block').hide(); }
  else{
    selectors.get('#offer_block').show();
    selectors.get('#offer_target').text('Offer target: '+player.offer_target+'%');

    if(player.power_can_upgrade==2){
      selectors.get('#power_dice_roll').prop('disabled', false);
      selectors.get('#hire_troopers').prop('disabled', false);
      selectors.get('#upgrade_troopers').prop('disabled', false);
      selectors.get('#double_troopers').prop('disabled', false);
      selectors.get('#upgrade_by_five').prop('disabled', false);
    }else{
      selectors.get('#power_dice_roll').prop('disabled', true);
      selectors.get('#hire_troopers').prop('disabled', true);
      selectors.get('#upgrade_troopers').prop('disabled', true);
      selectors.get('#double_troopers').prop('disabled', true);
      selectors.get('#upgrade_by_five').prop('disabled', true);
    }

    selectors.get('#power_dice_roll').text('x'+player.dice_range[0]+' or x'+player.dice_range[1]);

    if(player.offers[1]==1){
      selectors.get('#hire_troopers').show();
    }else{
      selectors.get('#hire_troopers').hide();
    }

    if(player.offers[2]==1){
      selectors.get('#upgrade_troopers').show();
    }else{
      selectors.get('#upgrade_troopers').hide();
    }

    if(player.offers[3]==1){
      selectors.get('#double_troopers').show();
    }else{
      selectors.get('#double_troopers').hide();
    }

    if(player.offers[4]==1){
      selectors.get('#upgrade_by_five').show();
    }else{
      selectors.get('#upgrade_by_five').hide();
    }


  }



  if(player.message==0){selectors.get('#message').hide();}
  else{
    selectors.get('#message').show();

    switch(player.message){

      case 1:
        selectors.get('#message_body').text('Almost completely destroyed, Roboflick hides behind his sturdy shuttle and slids inside. "The princess is in another castle!" he shouts at you and cackles wildly.');

        let confirm_msg="You won't get away, you fiend!";

        selectors.get('#message_ok').text(confirm_msg);

      break;

    }


  }




  selectors.get('#mon_title').text(monsters_metadata[player.level][1]);


  progressBarMon(selectors.get('#pb_enemy'),game.mon_hp);


  //troopers
  if(player.troopers<1){selectors.get('#troopers_block').hide();}
  else{

    selectors.get('#troopers_block').show();

    let troopers_text='';
    let troopers_max='';
    if(player.troopers==MAX_TROOPERS){troopers_max=' (max)';}

    troopers_text+='<div class="tiny_lightgray_center">Units: <b>'+player.troopers+'</b>'+troopers_max+'</div>';
    troopers_text+='<div class="tiny_lightgray_center">Power per unit: <b>'+numT(player.troopers_power)+'</b> | Collective power: <b>'+numT(player.troopers_power*player.troopers)+'</b></div>';

    if(player.troopers<10){
      for (let n = 0; n < player.troopers; n++) {
        troopers_text+='<img src="img/trooper_purple.png">&nbsp;';
      }
    }else{
      for (let n = 0; n < player.troopers*0.1; n++) {
        troopers_text+='<img src="img/trooper_blue.png">&nbsp;';
      }
    }
    

    selectors.get('#troopers_container').html(troopers_text).show();

  }

  //trees
  if(player.trees<1){selectors.get('#trees_block').hide();}
  else{

    selectors.get('#trees_block').show();

    let trees_text='';

    trees_text+='<div class="tiny_lightgray_center">Units: <b>'+player.trees+'</b></div>';
    trees_text+='<div class="tiny_lightgray_center">Power per unit: <b>RG -'+prestige.trees_power+'%</b> | Collective power: <b>RG -'+numT(trees_effect)+'%</b></div>';

    for (let n = 0; n < parseInt(player.trees/10); n++) {
      trees_text+='<img src="img/tree10.png">&nbsp;';
    }

    for (let n = 0; n < (player.trees%10); n++) {
      trees_text+='<img src="img/tree.png">&nbsp;';
    }

    selectors.get('#trees_container').html(trees_text).show();

  }

  //undead
  if(player.undead<1){selectors.get('#undead_block').hide();}
  else{

    selectors.get('#undead_block').show();

    selectors.get('#undead_to_trees').html('Plant 1 Tree<br><span class="button_hint">'+numT(player.undead_tree_base_price+player.undead_trees)+' Undead</span>');
    selectors.get('#undead_wave').html('Attack Wave<br><span class="button_hint">'+numT(player.undead_wave_base_price+player.undead_waves)+' Undead</span>');
    //selectors.get('#undead_bomb').html('Undead Bomb<br><span class="button_hint">'+numT(player.undead_tree_base_price+player.undead_bombs)+' Undead</span>');

    let undead_text='';

    undead_text+='<div class="tiny_lightgray_center">Units: <b>'+player.undead+'</div>';

    for (let n = 0; n < parseInt(player.undead/100); n++) {
      undead_text+='<img src="img/undead100.png">&nbsp;';
    }

    for (let n = 0; n < parseInt((player.undead%100)/10); n++) {
      undead_text+='<img src="img/undead10.png">&nbsp;';
    }

    for (let n = 0; n < (player.undead%10); n++) {
      undead_text+='<img src="img/undead.png">&nbsp;';
    }

    selectors.get('#undead_container').html(undead_text);

  }





  //prestige artefacts
  if(prestige.restarts<1){ selectors.get('#artefacts_block').hide(); }
  else{
    
    selectors.get('#artefacts_block').show();

    if(prestige.trees_as_offer==1){selectors.get('#art1').show();}else{selectors.get('#art1').hide();}
    if(prestige.starting_troopers>0){selectors.get('#art2').show();}else{selectors.get('#art2').hide();}
    if(prestige.undead_inc==2){selectors.get('#art3').show();}else{selectors.get('#art3').hide();}

  }



  //endgame
  if(player.level==0){

    if(prestige.trees_as_offer==1){selectors.get('#art1_prestige').prop('disabled', true).text('Acquired');}
    else{selectors.get('#art1_prestige').prop('disabled', false).text('Go!');}

    if(prestige.starting_troopers>0){selectors.get('#art2_prestige').prop('disabled', true).text('Acquired');}
    else{selectors.get('#art2_prestige').prop('disabled', false).text('Move out!');}

    if(prestige.undead_inc==2){selectors.get('#art3_prestige').prop('disabled', true).text('Acquired');}
    else{selectors.get('#art3_prestige').prop('disabled', false).text('Charge!');}

  }




  //footer

  if(misc_settings.settings_toggle==0){
    selectors.get('#settings_block').hide();
  }else{
    selectors.get('#settings_block').show();

    if(misc_settings.save_del_confirm_toggle==0){selectors.get('#save_del_confirm_block').hide();}
    else{selectors.get('#save_del_confirm_block').show();}
  
    if(settings.audio_mute==1){
      selectors.get('#button_audio').text("Turn it back on");
    }else{
      selectors.get('#button_audio').text("Turn it off");
    }
  
    selectors.get('#audio_control_volume').val(settings.audio_volume);

  }

  


}


function rateCalc(){

  current_rate=0;

  let troopers_rate=player.troopers*player.troopers_power;

  current_rate+=troopers_rate;

}

function powerUpgrade(amount=1){

  player.power_counter+=amount;

  player.power_ratio=Math.floor(player.power_counter/player.power_goal);



  if(player.power_ratio>=player.offer_target && player.power_can_upgrade==1) {

    player.power_can_upgrade=2;
    player.power_ratio=player.offer_target;

    storeState();
    refreshUI();
    playAudio(4);

  }else if(player.power_ratio>=player.offer_target && player.power_can_upgrade==2){
    player.power_ratio=player.offer_target;
  }

  if(player.power_ratio>=100 && player.power_can_upgrade==0){
    player.power_can_upgrade=1;
    player.power_upgrade_amount=2;
    player.offer_target=getRandomInt(150,200);

    setupBonuses();

    //generate offers
    player.offers[0]=1;//power dice roll
    player.dice_range[0]=3;
    player.dice_range[1]=parseInt(choose([4,4,4,5,6,7]));

    //hire 5 troopers
    if(player.troopers<1){
      player.offers[1]=getRandomInt(0,1);
      if(player.troopers==0){player.offers[1]=1;}
    }else{player.offers[1]=0;}
    
    //upgrade troopers
    if(player.troopers>0){player.offers[2]=getRandomInt(0,1);}else{player.offers[2]=0;}

    //douple troopers
    if(player.troopers>0 && player.troopers<MAX_TROOPERS){player.offers[3]=getRandomInt(0,1);}else{player.offers[3]=0;}

    //upgrade by five
    if(player.troopers>0 && player.offers[2]==0){player.offers[4]=parseInt(choose([0,1,1,1]));}else{player.offers[4]=0;}

    storeState();
    refreshUI();
    playAudio(4);
  }

}

function ugCalc(){
  player.power_goal=player.base_power_goal*(player.power+player.troopers*player.troopers_power)*Math.pow(1.05,player.restarts)*Math.pow(1.01,player.cheaper_restarts)*Math.pow(1-prestige.trees_power*0.01,player.trees);
}



function saveGame(){

  let gameData = {
      universal:[game,player,settings,prestige]
    };

    gameData=LZString.compressToBase64(JSON.stringify(gameData));
    localStorage.setItem(savefile_name, gameData);
}
function loadGame(){
  let gameData=localStorage.getItem(savefile_name);
  gameData = JSON.parse(LZString.decompressFromBase64(gameData));

    game=gameData.universal[0];
    player=gameData.universal[1];
    settings=gameData.universal[2];
    prestige=gameData.universal[3];

    rateCalc();

}
function delSave(){
  localStorage.removeItem(savefile_name);
}




function progressBarMon($element, $hp){

  player.mon_hp_percent=($hp/player.mon_max_hp)*100;

  let color='green';
  if(player.mon_hp_percent<60){color='orange';}
  if(player.mon_hp_percent<20){color='red';}

  $element.width(player.mon_hp_percent+'%').css('background-color', 'var(--'+color+')');
  selectors.get('#mon_hp_label').text(numT($hp)).css('color', 'var(--'+color+')');

}
function progressBarRatio($element, $value){

  let percentage=$value;

  if(percentage>100){percentage=100;}

  if(percentage<25){$element.width(percentage+'%').text('');}
  else{$element.width(percentage+'%').text($value+'%');}
  

}



function getPrices(base_price,growth_rate,current_amount){

  let all_prices=[0,0,0];

  all_prices[0]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,1)-1) / (growth_rate-1);
  all_prices[1]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,10)-1) / (growth_rate-1);
  all_prices[2]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,100)-1) / (growth_rate-1);

  //let result=base_price*Math.pow(growth_rate,9);
  return all_prices;

}
function getPrices2(base_price,growth_rate,current_amount,desired_amount){

  return base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,desired_amount)-1) / (growth_rate-1);

}

function numT(number, decPlaces=2) {

  //numTransform

  //my optimization: it used to do abbrev.length in two places, since the length here is not variable, I cache it. Performance boost is likely to be very small, but as this is one of the most used functions in the game, I want to make sure it is ultra-optimized

  if(settings.scientific==0){

  var abbrev_length=74;

          number = Math.round(number*100)/100;//my addition: round any incoming floats first

          // 2 decimal places => 100, 3 => 1000, etc
          decPlaces = Math.pow(10,decPlaces);
          // Enumerate number abbreviations
          var abbrev = [ "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "Qt", "Qd", "Sd", "St", "O", "N", "c", "kc", "d", "kd", "e", "ke", "f", "kf", "h", "kh", "i", "ki", "j", "kj", "L", "kL", "Na", "kNa", "Nb", "kNb", "Nc", "kNc", "Nd", "kNd", "Ne", "kNe", "Nf", "kNf", "Ng", "kNg", "Nh", "kNh", "Ni", "kNi", "Nj", "kNj", "Nk", "kNk", "Nl", "kNl", "Nm", "kNm", "Np", "kNp", "Nq", "kNq", "Nr", "kNr", "Ns", "kNs", "Nt", "kNt", "Nu", "kNu" ];

          // Go through the array backwards, so we do the largest first
          for (var i=abbrev_length-1; i>=0; i--) {
              // Convert array index to "1000", "1000000", etc
              var size = Math.pow(10,(i+1)*3);
              // If the number is bigger or equal do the abbreviation
              if(size <= number) {
                   // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                   // This gives us nice rounding to a particular decimal place.
                   number = Math.round(number*decPlaces/size)/decPlaces;
                   // Handle special case where we round up to the next abbreviation
                   if((number == 1000) && (i < abbrev_length - 1)) {
                       number = 1;
                       i++;
                   }
                   // Add the letter for the abbreviation
                   number += ""+abbrev[i];
                   // We are done... stop
                   break;
              }
          }

        }else{
          if(number>=1000){return Number(number).toExponential(2).replace(/\+/g, "");}
          else{number = Math.round(number*100)/100;}
        }

          return number;
}
function romanize(number){
  if (!+number)
    return false;
  var	digits = String(+number).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
           "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
           "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}



function choose(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
function inArray(value,array){

  for (let i = 0; i < array.length; i++) {
    if(value==array[i]){return true;}
  }
  return false;
}
function inMultiArray(value,array){
  for (let i = 0; i < array.length; i++) {
    for (let ii = 0; ii < array[i].length; ii++) {
      if(value==array[i][ii]){return true;}
    }
  }
  return false;
}

function nE(){//euros

  if(bliss.all_time_num>=nextEuroCost){

    bliss.all_time_dollars=Math.floor( Math.cbrt( bliss.all_time_num/EUROS_BASE_COST ) );//recalculating all-time dollars

    let dollars=bliss.all_time_dollars-bliss.spent_dollars;
    dollars_label.text('€'+numT(dollars));
    jobcenter_recruiter_metrics.html('current multiplier: <b>x' + numT(bliss.cmultiplier) + '</b><br>multipler after reset: <b>x' + numT(bliss.all_time_dollars) + '</b>' );
    jobcenter_ateuros.text(numT(bliss.all_time_dollars));
    //prevEuroCost=EUROS_BASE_COST * Math.pow((bliss.all_time_dollars),3);
  }
  nextEuroCost=EUROS_BASE_COST * Math.pow((bliss.all_time_dollars+1),3);

  if(frames1%10==0){
    jobcenter_nexteuro.text(numT(nextEuroCost - bliss.all_time_num));
  }


}

function setupAudio(){

  session_data.hit1 = new Howl({
    src: ['snd/hit1.wav'],
  });

  session_data.hit2 = new Howl({
    src: ['snd/hit2.wav'],
  });

  session_data.hit3 = new Howl({
    src: ['snd/hit3.wav'],
  });

  session_data.exp_mon = new Howl({
    src: ['snd/exp_mon.wav'],
  });

  session_data.upgrade = new Howl({
    src: ['snd/upgrade.wav'],
  });

  session_data.upgrade_ready = new Howl({
    src: ['snd/upgrade_ready.wav'],
  });

  session_data.lasershoot1 = new Howl({
    src: ['snd/laserShoot1.wav'],
    volume: 0.3
  });

  session_data.lasershoot2 = new Howl({
    src: ['snd/laserShoot2.wav'],
    volume: 0.3
  });

}
function playAudio(snd){

  if(session_data.audio_initiated==0){
    session_data.audio_initiated=1;
    setupAudio();
  }

  if(settings.audio_mute==0){
		switch(snd){
			
      case 1:
        
        let ch=getRandomInt(0,2);
        switch(ch){
          case 0: session_data.hit1.play();break;
          case 1: session_data.hit2.play();break;
          case 2: session_data.hit3.play();break;
        }
        
      break;
			
      case 2: session_data.exp_mon.play(); break;
			case 3: session_data.upgrade.play(); break;
			case 4: session_data.upgrade_ready.play(); break;
      case 5:

        let ch2=getRandomInt(0,1);
          switch(ch2){
            case 0: session_data.lasershoot1.rate(getRandomInt(0.7,1.3)); session_data.lasershoot1.play();break;
            case 1: session_data.lasershoot2.rate(getRandomInt(0.7,1.3)); session_data.lasershoot2.play();break;
          }
      
      break;
			}
	}
}


$(document).ready(function(){

    document.title = "Why did you invade Mars? v"+version;
      console.log("Why did you invade Mars? v"+version);
      console.log("created by Louigi Verona");
      console.log("https://louigiverona.com/?page=about");
  
  
    //init functions
  
    if(localStorage.getItem(savefile_name)){
      selectors.get('#intro_block').hide();
      selectors.get('#loadgame_block').show();
      selectors.get('#all').hide();
      loadGame();
    }else{
      selectors.get('#intro_block').show();
      selectors.get('#loadgame_block').hide();
      selectors.get('#all').hide();
      setupPlayer();
      setupGame();
    }
  
    commonInit();
    refreshUI();
  
    ////////////////
  
    $("html").keydown(function( event ) {
      switch (event.key){
        case "x":
        case "X":
          player.fire_pressed=1;
        break;
      }
  
    });

    $("html").keyup(function( event ) {
      switch (event.key){
        case "x":
        case "X":
          player.fire_pressed=0;
        break;
      }
  
    });

    $(window).blur(function() {player.fire_pressed=0;});



  
    selectors.get('#button_settings').click(function(){
      playAudio(1);
  
      if(misc_settings.settings_toggle==0){
        misc_settings.settings_toggle=1;
      }else{misc_settings.settings_toggle=0;}
  
      refreshUI();
    });
    selectors.get('#button_scientific').click(function(){
      playAudio(1);
  
      if(settings.scientific==0){
        settings.scientific=1;
      }else{settings.scientific=0;}
  
      refreshUI();
    });
    selectors.get('#button_save').click(function(){
      playAudio(1);
  
      selectors.get('#button_save').text("Saved").prop("disabled",true);
  
      saveGame();
  
      setTimeout(function() { selectors.get('#button_save').text("Save Game").prop("disabled",false); }, 1000);
  
    });
    selectors.get('#button_delsave').click(function(){

        playAudio(1);
        if(misc_settings.save_del_confirm_toggle==0){misc_settings.save_del_confirm_toggle=1;}
        else{misc_settings.save_del_confirm_toggle=0;}
        refreshUI();
    
    });
    selectors.get('#save_del_confirm').click(function(){

        delSave();
        location.reload();

    });
    selectors.get('#save_del_cancel').click(function(){

        playAudio(1);
        misc_settings.save_del_confirm_toggle=0;
        refreshUI();

    });
    selectors.get('#button_copysave').click(function(){
      playAudio(1);
  
      let gameData=localStorage.getItem(savefile_name);
      navigator.clipboard.writeText(gameData);
  
      selectors.get('#button_copysave').text("Copied").prop("disabled",true);
  
      setTimeout(function() { selectors.get('#button_copysave').text("Copy").prop("disabled",false); }, 1000);
  
    });
    selectors.get('#button_importsave').click(function(){
  
      if(selectors.get('#import_save_dump').text().length<=0){return;}
  
      playAudio(1);
  
      localStorage.setItem(savefile_name, selectors.get('#import_save_dump').text());
      selectors.get('#import_save_dump').text('');
  
      misc_settings.settings_toggle=0;
  
      loadGame();
      refreshUI();
  
    });
    selectors.get('#button_audio').click(function(){
  
      playAudio(1);
  
      if(settings.audio_mute==0){
        settings.audio_mute=1;
      }else{
        settings.audio_mute=0;
        playAudio(1);
      }
  
      refreshUI();
  
    });
    selectors.get('#audio_control_volume').mousemove(function(){
          settings.audio_volume=selectors.get('#audio_control_volume').val();
          Howler.volume(settings.audio_volume);
    });


    selectors.get('#restart_button').click(function(){

      if(player.power_upgrade_amount==2){
        playAudio(3);
        player.power_level*=player.power_upgrade_amount;
        restartGame(2);
      }

    });

    selectors.get('#offer_button').click(function(){

      if(player.offer_is_available==0){
        playAudio(3);
        player.offer_is_available=1;
        storeState();
        refreshUI();
      }

    });

    selectors.get('#power_dice_roll').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(3);
        player.power_upgrade_amount=choose(player.dice_range);
        refreshUI();
        setTimeout(function (){playAudio(3); player.power_level*=player.power_upgrade_amount; restartGame();}, 1000);
      }

    });
    selectors.get('#hire_troopers').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(3);
        player.troopers+=5;
        if(player.troopers>MAX_TROOPERS){player.troopers=MAX_TROOPERS;}
        restartGame();
      }

    });
    selectors.get('#upgrade_troopers').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(3);
        player.troopers_power*=2;
        restartGame();
      }

    });
    selectors.get('#double_troopers').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(3);
        player.troopers*=2;
        if(player.troopers>MAX_TROOPERS){player.troopers=MAX_TROOPERS;}
        restartGame();
      }

    });
    selectors.get('#upgrade_by_five').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(3);
        player.troopers_power*=5;
        restartGame();
      }

    });


    selectors.get('#reduce_goal').click(function(){

      if(player.power_upgrade_amount<3){
        playAudio(1);
        player.trees++;ugCalc();
        //restartGame(3);
        player.bonuses[0]=0;refreshUI();
      }

    });
    selectors.get('#reduce_tree_price').click(function(){

      playAudio(1);
      player.undead_trees=0;
      //restartGame(3);
      player.bonuses[1]=0;refreshUI();

    });
    selectors.get('#reduce_wave_price').click(function(){

      playAudio(1);
      player.undead_waves=0;
      //restartGame(3);
      player.bonuses[2]=0;refreshUI();

    });
    selectors.get('#add_5_undead').click(function(){

      playAudio(1);
      player.undead+=5;
      //restartGame(3);
      player.bonuses[3]=0;storeState();refreshUI();

    });
    selectors.get('#add_25_undead').click(function(){

      playAudio(1);
      player.undead+=25;
      //restartGame(3);
      player.bonuses[4]=0;storeState();refreshUI();

    });


    selectors.get('#message_ok').click(function(){

      player.read_messages.push(player.message);

      switch(player.message){
        case 1:
          player.message=0;
          game.mon_hp=0;
          session_data.main_loop=setInterval(calc, 50);
          refreshUI();
        break;

      }

    });


    selectors.get('#undead_to_trees').click(function(){

      if(player.undead-(player.undead_tree_base_price+player.undead_trees)>=0){
        playAudio(1);
        player.undead-=player.undead_tree_base_price+player.undead_trees;
        player.trees++;
        player.undead_trees++;
        ugCalc();
        storeState();
        refreshUI();
      }

    });
    selectors.get('#undead_wave').click(function(){

      if(player.undead-(player.undead_wave_base_price+player.undead_waves)>=0){
        playAudio(1);
        player.undead-=player.undead_wave_base_price+player.undead_waves;
        player.undead_waves++;

        let attack_force=0;

        if(player.power>current_rate){
          attack_force=player.power*1000;
          game.mon_hp-=attack_force;
        }else if(current_rate>player.power){
          attack_force=current_rate*1000;
          game.mon_hp-=attack_force;
        }

        powerUpgrade(attack_force);
        storeState();
        refreshUI();
      }

    });




    selectors.get('#monster_info').mouseenter(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#rgg_sign').mouseenter(function(){
      selectors.get('#monster_info').html('Restart Goal is the number you need to reach in order to restart.<br>A new RG is then calculated to compensate for your acquired power, but also some additional growth is added on top as cost.<br>This makes reaching the next restart slightly longer.');
    });
    selectors.get('#rgg_sign').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#rgg_label').mouseenter(function(){
      selectors.get('#monster_info').text('How much has the Restart Goal grown by');
    });
    selectors.get('#rgg_label').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#rgg_comp_label').mouseenter(function(){
      selectors.get('#monster_info').text('Compensated Restart Goal growth, which takes into account the effect of the trees');
    });
    selectors.get('#rgg_comp_label').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#manual_power').mouseenter(function(){
      selectors.get('#monster_info').text('Manual power');
    });
    selectors.get('#manual_power').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#rg_info').mouseenter(function(){
      session_data.hover_over_bar=1;
      selectors.get('#monster_info').html('This bar shows how close we are to the Restart Goal<br>In absolute numbers: '+numT(player.power_counter)+'/'+numT(player.power_goal*100));
    });
    selectors.get('#rg_info').mouseleave(function(){
      session_data.hover_over_bar=0;
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#restart_button').mouseenter(function(){
      selectors.get('#monster_info').text('Double your manual power. Restart Goal will be increased only by 1%');
    });
    selectors.get('#restart_button').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#offer_button').mouseenter(function(){
      selectors.get('#monster_info').text('If you pick an offer, Restart Goal will be increased by 5%');
    });
    selectors.get('#offer_button').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#power_dice_roll').mouseenter(function(){
      selectors.get('#monster_info').text('Increase your manual power');
    });
    selectors.get('#power_dice_roll').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#hire_troopers').mouseenter(function(){
      selectors.get('#monster_info').text('Like your passive income, only better returns');
    });
    selectors.get('#hire_troopers').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#upgrade_troopers').mouseenter(function(){
      selectors.get('#monster_info').text('Double per unit power');
    });
    selectors.get('#upgrade_troopers').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#double_troopers').mouseenter(function(){
      selectors.get('#monster_info').text('Double the amount of troopers');
    });
    selectors.get('#double_troopers').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#upgrade_by_five').mouseenter(function(){
      selectors.get('#monster_info').text('Increase per unit power by x5');
    });
    selectors.get('#upgrade_by_five').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#reduce_goal').mouseenter(function(){
      selectors.get('#monster_info').text('Decrease Restart Goal by '+prestige.trees_power+'%');
    });
    selectors.get('#reduce_goal').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#reduce_tree_price').mouseenter(function(){
      selectors.get('#monster_info').text('Reset tree price');
    });
    selectors.get('#reduce_tree_price').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#reduce_wave_price').mouseenter(function(){
      selectors.get('#monster_info').text('Reset attack wave price');
    });
    selectors.get('#reduce_wave_price').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });





    selectors.get('#mon_title').mouseenter(function(){
      selectors.get('#monster_info').text(monsters_metadata[player.level][2]);
    });
    selectors.get('#mon_title').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });
    selectors.get('#mon_image').mouseenter(function(){
      selectors.get('#monster_info').text(monsters_metadata[player.level][2]);
    });
    selectors.get('#mon_image').mouseleave(function(){
      selectors.get('#monster_info').html('&nbsp;');
    });

    selectors.get('#troopers_block').mouseenter(function(){
      if(player.troopers<10){selectors.get('#troopers_info').text('Troopers galore!');}
      else{selectors.get('#troopers_info').text('A blue trooper represents 10 units');}
    });
    selectors.get('#troopers_block').mouseleave(function(){
      selectors.get('#troopers_info').html('&nbsp;');
    });

    selectors.get('#trees_block').mouseenter(function(){
      if(player.trees<10){selectors.get('#trees_info').text('Each tree reduces Restart Goal by '+prestige.trees_power+'%');}
      else{selectors.get('#trees_info').text('Each tree reduces RG by '+prestige.trees_power+'% | A purple tree represents 10 units');}
      
    });
    selectors.get('#trees_block').mouseleave(function(){
      selectors.get('#trees_info').html('&nbsp;');
    });

    selectors.get('#undead_container').mouseenter(function(){
      if(prestige.undead_inc==1){selectors.get('#undead_info').text('An undead is added if you kill a monster with a single blow');}
      else{selectors.get('#undead_info').text('Two undead are added if you kill a monster with a single blow');}
      
    });
    selectors.get('#undead_container').mouseleave(function(){
      selectors.get('#undead_info').html('&nbsp;');
    });

    selectors.get('#undead_to_trees').mouseenter(function(){
      selectors.get('#undead_info').text('Decrease RG by '+prestige.trees_power+'%');
    });
    selectors.get('#undead_to_trees').mouseleave(function(){
      selectors.get('#undead_info').html('&nbsp;');
    });

    selectors.get('#undead_wave').mouseenter(function(){
      selectors.get('#undead_info').text('Sacrifice the dead for significant damage');
    });
    selectors.get('#undead_wave').mouseleave(function(){
      selectors.get('#undead_info').html('&nbsp;');
    });

    selectors.get('#undead_bomb').mouseenter(function(){
      selectors.get('#undead_info').text('Sacrifice the dead to do 5% damage');
    });
    selectors.get('#undead_bomb').mouseleave(function(){
      selectors.get('#undead_info').html('&nbsp;');
    });

    selectors.get('#art1').mouseenter(function(){
      selectors.get('#artefacts_info').text('Tree power is increased from 2% to 3%. "Plant a Tree" now appears frequently');
    });
    selectors.get('#art1').mouseleave(function(){
      selectors.get('#artefacts_info').html('&nbsp;');
    });

    selectors.get('#art2').mouseenter(function(){
      selectors.get('#artefacts_info').text('Start with a full regiment of troopers');
    });
    selectors.get('#art2').mouseleave(function(){
      selectors.get('#artefacts_info').html('&nbsp;');
    });

    selectors.get('#art3').mouseenter(function(){
      selectors.get('#artefacts_info').text('Single blow produces 2 undead');
    });
    selectors.get('#art3').mouseleave(function(){
      selectors.get('#artefacts_info').html('&nbsp;');
    });






    //Intro, resume and ending

    selectors.get('#startgame').click(function(){

      playAudio(3);
      selectors.get('#intro_block').hide();
      selectors.get('#loadgame_block').hide();
      selectors.get('#endgame_block').hide();
      selectors.get('#all').show();
      session_data.main_loop=setInterval(calc, 50);
      
    });
    selectors.get('#button_resume').click(function(){

      playAudio(1);

      selectors.get('#intro_block').hide();
      selectors.get('#loadgame_block').hide();

      if(player.level==0){//endgame
        selectors.get('#endgame_block').show();
        selectors.get('#all').hide();
      }else{
        selectors.get('#endgame_block').hide();
        selectors.get('#all').show();
        session_data.main_loop=setInterval(calc, 50);
      }

      
      
      
    });

    selectors.get('#prestigegame').click(function(){

      playAudio(1);
      selectors.get('#prestige_table').show();
      
    });

    selectors.get('#art1_prestige').click(function(){

      playAudio(1);
      prestige.trees_power=3;
      prestige.trees_as_offer=1;
      prestigeGame();
      
    });

    selectors.get('#art2_prestige').click(function(){

      playAudio(1);
      prestige.starting_troopers=80;
      prestigeGame();
      
    });

    selectors.get('#art3_prestige').click(function(){

      playAudio(1);
      prestige.undead_inc=2;
      prestigeGame();
      
    });

    selectors.get('#noart_prestige').click(function(){

      playAudio(1);
      prestigeGame();
      
    });




    selectors.get('#prestigegame_no').mouseenter(function(){
      selectors.get('#prestigegame_no').css("visibility", "hidden");
    });
    selectors.get('#prestigegame').mouseenter(function(){
      selectors.get('#prestigegame_no').css("visibility", "visible");
    });

    selectors.get('#leavegame').mouseenter(function(){
      selectors.get('#leavegame').css("visibility", "hidden");
    });
    selectors.get('#startgame').mouseenter(function(){
      selectors.get('#leavegame').css("visibility", "visible");
    });

    selectors.get('#button_noresume').mouseenter(function(){
      selectors.get('#button_noresume').css("visibility", "hidden");
    });
    selectors.get('#button_resume').mouseenter(function(){
      selectors.get('#button_noresume').css("visibility", "visible");
    });

  
  });//document.ready
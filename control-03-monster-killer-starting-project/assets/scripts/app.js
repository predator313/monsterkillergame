const attackValue=10;//this value should be remains constant through out the program
const strongAttackValue=15;
const monster_attack_value=13;
const HEAL_VALUE=18;
const mode_Attack='ATTACK';
const mode_strongAttack='STRONG_ATTACK';
const enteredValue=prompt('please enter monster max lif','100');
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';

let chosenMaxLife=parseInt(enteredValue);
let battleLog=[];

if(isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife=100;
}
function WritetoLog(event,value,monster_health,player_health){
    let logEntry;
    if(event===LOG_EVENT_PLAYER_ATTACK){
        logEntry={
            event:event,
            value:value,
            target:'MONSTER',
            final_Monster_Health:monster_health,
            final_Player_Health:player_health,
        };
        battleLog.push(logEntry);
    }
    else if(event===LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry={
            event:event,
            value:value,
            target:'MONSTER',
            final_Monster_Health:monster_health,
            final_Player_Health:player_health
        };
        battleLog.push(logEntry);
    }
    else if(event===LOG_EVENT_MONSTER_ATTACK){
        logEntry={
            event:event,
            value:value,
            target:'PLAYER',
            final_Monster_Health:monster_health,
            final_Player_Health:player_health
        }
        battleLog.push(logEntry);
    }
    else if(event===LOG_EVENT_PLAYER_HEAL){
        logEntry={
            event:event,
            value:value,
            target:'PLAYER',
            final_Monster_Health:monster_health,
            final_Player_Health:player_health
        }
        battleLog.push(logEntry);
    }
    else if(event===LOG_EVENT_GAME_OVER){
        logEntry={
            event:event,
            value:value,
            final_Monster_Health:monster_health,
            final_Player_Health:player_health
        }
        battleLog.push(logEntry);
    }

}
let currentMonsterHealth=chosenMaxLife;
let currentPlayerHealth=chosenMaxLife;
let hasbonusLife=true;
adjustHealthBars(chosenMaxLife);
function Reset(){
    currentMonsterHealth=chosenMaxLife;
    currentPlayerHealth=chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    // const damage=dealMonsterDamage(max_damage);
    // currentMonsterHealth-=damage;
    const initial_palyer_health=currentPlayerHealth;

    const damage_player=dealPlayerDamage(monster_attack_value);
    currentPlayerHealth-=damage_player;
    WritetoLog(LOG_EVENT_MONSTER_ATTACK,
        damage_player,
        currentMonsterHealth,
        currentPlayerHealth);
    if(currentPlayerHealth<=0 && hasbonusLife){
        hasbonusLife=false;
        removeBonusLife();
        currentPlayerHealth=initial_palyer_health;
        setPlayerHealth(initial_palyer_health);
        alert('you would be lose but bonus_life save you');

    }
    
    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('hey you won....');
        WritetoLog(LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth);
    }
    else if(currentMonsterHealth>0 && currentPlayerHealth<=0){
        alert('you lose.... try again');
        WritetoLog(LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth);
    }
    else if(currentMonsterHealth<=0 && currentMonsterHealth<=0){
        alert('you have drawn the match');
        WritetoLog(LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth);
    }


    if(currentMonsterHealth<=0 || currentPlayerHealth<=0){
        Reset();
    }
}
function attack_monster(mode){
    let max_damage;
    let logevnt;
    if(mode===mode_Attack){
        max_damage=attackValue;
        logevnt=LOG_EVENT_PLAYER_ATTACK;
    }
    else if(mode===mode_strongAttack){
        max_damage=strongAttackValue;
        logevnt=LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage=dealMonsterDamage(max_damage);
    currentMonsterHealth-=damage;
    WritetoLog(logevnt,
        damage,
        currentMonsterHealth,
        currentPlayerHealth);
    endRound();
    
}
function attackHandler(){
    attack_monster(mode_Attack);
    
}
function strongAttackHandler(){
    attack_monster(mode_strongAttack);

}
function healPlayerHandler(){
    let healvalue;
    if(currentPlayerHealth>=chosenMaxLife-HEAL_VALUE){
        alert("hey you can't heal more than max initial health");

    }
    else{
        healvalue=HEAL_VALUE;
    }
    increasePlayerHealth(healvalue);
    currentPlayerHealth+=healvalue;
    WritetoLog(LOG_EVENT_PLAYER_HEAL,
        healvalue,
        currentMonsterHealth,
        currentPlayerHealth);
    endRound();
}
function printLog(){
    console.log(battleLog);
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLog);

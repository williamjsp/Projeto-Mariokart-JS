const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER: 3,
    PONTOS : 0,
}

const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER: 4,
    PONTOS : 0,
}

async function rollDice(){
   return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    if(random < 0.33){
        result = "RETA";
    } else if(random < 0.66){ 
        result = "CURVA";    
    } else{
        result = "CONFRONTO";
    }
    return result;

}

async function logRollResult(characterName, block, diceResult, attribute){
    let totalResult = diceResult + attribute;
    console.log(characterName + " 🎲 rolou um dado de " + block + ": "+ attribute +
    " + " + diceResult + " = " + totalResult);
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <=5; round++){
        console.log("🏁Round " + round); 
        
        let block = await getRandomBlock();  //sortear bloco
        console.log("Bloco: "+ block);
        console.log();

        // rolar os dados
        let diceResult1 = await rollDice();  
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;    
        let totalTestSkill2 = 0;

        if(block == "RETA"){   
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);  
            await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);
        }
        if(block == "CURVA"){   
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);  
            await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if(block == "CONFRONTO"){
            totalTestSkill1 = diceResult1 + character1.PODER;
            totalTestSkill2 = diceResult2 + character2.PODER;

            console.log(character1.NOME + " confrontou com " + character2.NOME + "!🥊");

            await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER);  
            await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER);
        }

        //Verificar o vencedo
        console.log();
        if(totalTestSkill1 > totalTestSkill2){
            console.log(character1.NOME + " Venceu a rodada e marcou 1 ponto!🎉 " + character2.NOME + " Perdeu um ponto!❌");
            character1.PONTOS++;
            if(character2.PONTOS > 0){
                character2.PONTOS--;
            }
        } else if(totalTestSkill1 < totalTestSkill2){
            console.log(character2.NOME + " Venceu a rodada e marcou 1 ponto!🎉 " + character1.NOME + " Perdeu um ponto!❌");
            character2.PONTOS++;
            if(character1.PONTOS > 0){
                character1.PONTOS--;
            }
        } else{
            console.log("Rodada empate! Ninguem marca ponto");
        }
        console.log("_______________________________________________");

    }
    await declareWinner();
}
    
async function declareWinner() {
    console.log("Resultado final: ");
    console.log();    
    console.log(player1.NOME + ": " + player1.PONTOS + " pontos");
    console.log(player2.NOME + ": " + player2.PONTOS + " pontos");
    console.log();
    if(player1.PONTOS > player2.PONTOS){
        console.log(player1.NOME + " venceu a corrida! Parabens!🏆🏁");
    } else if(player2.PONTOS > player1.PONTOS){
        console.log(player2.NOME + " venceu a corrida! Parabens!🏆🏁");
    } else{
        console.log("Corrida terminou em empate!🚨")
    }
    
}

(async function main(){
    console.log("🏁 🚨 Corrida entre " + player1.NOME + " e " + player2.NOME + " começando... \n");
    
    await playRaceEngine(player1, player2);

})(); 

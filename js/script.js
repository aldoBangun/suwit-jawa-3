const start = document.getElementsByTagName('button')[0];
const menu = document.getElementsByClassName('main-menu')[0];
const field = document.getElementsByClassName('field')[0];
start.addEventListener('click',function(){
    // start.innerHTML = 'RESTART';
    menu.remove();
    const result = document.getElementsByClassName('result')[0];
    const pScore = document.querySelector('.player-score h1');
    const cScore = document.querySelector('.com-score h1');
    const round = document.getElementsByClassName('round')[0];
    const imgCom = document.querySelector('.com-side img');
    pScore.innerHTML = '0';
    cScore.innerHTML = '0';
    round.innerHTML = 'Round 1';

    const getCom = function(){
        const com = Math.random();
        if(com<0.34) return 'semut';
        if(com>=0.34 && com<0.67) return 'orang';
        return 'gajah';
    }

    const getResult = function(com,player){
        if(com == player) return 'draw';
        if(com == 'gajah') return (player == 'orang') ? 'kalah' : 'menang';
        if(com == 'orang') return (player == 'semut') ? 'kalah' : 'menang';
        return (player == 'gajah') ? 'kalah' : 'menang';
    }

    const mixImgCom = function(){
        const option = ['gajah','orang','semut'];
        let i=0;
        const mixTime = new Date().getTime();
        setInterval(function(){
            if(new Date().getTime() - mixTime > 1500){
                clearInterval;
                return;
            }
            imgCom.setAttribute('src',`img/${option[i]}.png`);
            i++;
            if(i==option.length){
                i = 0;
            }
        }, 100);
    }

    const player = document.querySelectorAll('.player-side li img');
    let scoreCom = 0;
    let scorePlayer = 0;
    let rnd = 1;

    player.forEach(function(play){
        play.addEventListener('click',function(){
            play.style.filter = 'drop-shadow(0 0 15px #f77)';
            setTimeout(function(){
                play.style.filter = 'none';
            },2000);
            const imgCom = document.querySelector('.com-side img');
            const com = getCom();
            const player = play.className;
            mixImgCom();
            setTimeout(function(){
                imgCom.setAttribute('src',`img/${com}.png`);
                const res = getResult(com,player);
                if(res == 'menang') {
                    scorePlayer += 3;
                    scoreCom += 0;
                    result.style.backgroundColor = '#9f9';
                } else if ( res == 'kalah') {
                    scorePlayer += 0;
                    scoreCom += 3;
                    result.style.backgroundColor = '#f99';
                } else {
                    scorePlayer +=1;
                    scoreCom +=1;
                    result.style.backgroundColor = '#99f';
                }
                rnd++;
                if(rnd>10){
                    round.innerHTML = 'final score';
                    setTimeout(function(){
                        field.remove();
                    },500);
                } else {
                    setTimeout(function(){
                        round.innerHTML = 'round ' + rnd;
                    },1000);
                }
                result.innerHTML = res + '!';
                setTimeout(function(){
                    pScore.innerHTML = scorePlayer;
                    cScore.innerHTML = scoreCom;
                },500);
            },1500);
        });
    });
});
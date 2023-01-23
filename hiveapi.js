const scriptName = "hiveapi";
const BufferedReader = java.io.BufferedReader;
const DataOutputStream = java.io.DataOutputStream;
const InputStreamReader = java.io.InputStreamReader;
const HttpURLConnection = java.net.HttpURLConnection;
const URL = java.net.URL;
const URLEncoder = java.net.URLEncoder;
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
 try{
   //도움말
  if(msg.indexOf("/실적 도움말")==0){
          replier.reply(room, "[🧪실험 기능] 문제가 있을 경우 제보해주세요! 기능은 더 추가될 예정입니다.\n게임 실적 명령어 도움말\n\n\n플레이어 실적: /실적 [더하이브] [월별/전체] [트레져워즈/데스런/숨바꼭질/서바이벌게임/머더/스카이워즈/깃발잡기/드랍/그라운드워즈/건축] [개인별] [플레이어명]\n\n리더보드: /실적 [더하이브] [월별/전체] [트레져워즈] [리더보드]\n\n*리더보드는 현재 테스트 중인 기능입니다. 트레져워즈 말고도 다른 모든 게임 지원 예정입니다.\n\n[ 과 ] 괄호는 입력하지 마세요.\n더하이브에서 ⭐제한 XP는 한 게임 당 최대 XP를 도달한 다음 받은 XP를 의미합니다.\n이름에 공백(띄어쓰기)가 있는 경우 공백을 %20 으로 바꿔써주세요.\n\n예시: /실적 더하이브 월별 트레져워즈 개인별 Gorrings4567");
          
}
//통산을 전체로
if(msg.indexOf("/실적 더하이브 통산 ")==0){
      replier.reply("❌ '통산' 대신 '전체'로 바꿔서 명령어를 사용해 주시기 바랍니다.\n명령어 도움말: /실적 도움말");
      
}


//플레이어 월별
if(msg.indexOf("/실적 더하이브 월별 트레져워즈 개인별 ")==0){
    msg=msg.replace("/실적 더하이브 월별 트레져워즈 개인별 ", "");
    var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/wars/"+msg);
    var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
    var json = JSON.parse("{"+data2+"}");
    replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 트레져워즈, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪파이널 킬 수: "+ json.final_kills +"회\n🔪킬 수: "+ json.kills +"회\n🔨파괴한 보물: "+ json.treasure_destroyed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n⭐제한 XP: "+ json.uncapped_xp);
    
}

if(msg.indexOf("/실적 더하이브 월별 데스런 개인별 ")==0){
    msg=msg.replace("/실적 더하이브 월별 데스런 개인별 ", "");
    var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/dr/"+msg);
    var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
    var json = JSON.parse("{"+data2+"}");
    replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 데스런, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪킬 수: "+ json.kills +"회\n🚪통과한 체크포인트: "+ json.checkpoints +"개\n🔪죽은 횟수: "+ json.deaths +"회\n⭐제한 XP: "+ json.uncapped_xp);
    
}

if(msg.indexOf("/실적 더하이브 월별 숨바꼭질 개인별 ")==0){
    msg=msg.replace("/실적 더하이브 월별 숨바꼭질 개인별 ", "");
    var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/hide/"+msg);
    var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
    var json = JSON.parse("{"+data2+"}");
    replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 숨바꼭질, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪숨은사람 킬 수: "+ json.hider_kills +"회\n🔪술래 킬 수: "+ json.seeker_kills +"회\n🔪죽은 횟수: "+ json.deaths +"회");
    
}

if(msg.indexOf("/실적 더하이브 월별 서바이벌게임 개인별 ")==0){
    msg=msg.replace("/실적 더하이브 월별 서바이벌게임 개인별 ", "");
    var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/sg/"+msg);
    var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
    var json = JSON.parse("{"+data2+"}");
    replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 서바이벌게임, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n📦연 상자: "+ json.crates +"개\n🐄잡은 소: "+ json.cows +"마리\n🔪킬 수: "+ json.kills +"회\n⭐제한 XP: "+ json.uncapped_xp);
    
}

if(msg.indexOf("/실적 더하이브 월별 머더 개인별 ")==0){
    msg=msg.replace("/실적 더하이브 월별 머더 개인별 ", "");
    var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/murder/"+msg);
    var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
    var json = JSON.parse("{"+data2+"}");
    replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 머더, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪죽은 횟수: "+ json.deaths +"회\n🤑얻은 동전: "+ json.coins +"개\n📍머더: "+ json.murders +"번\n🔪죽인 머더: "+ json.murderer_eliminations +"명\n⭐제한 XP: "+ json.uncapped_xp);
    
}

if(msg.indexOf("/실적 더하이브 월별 스카이워즈 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 월별 스카이워즈 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/sky/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 스카이워즈, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪킬 수: "+ json.kills +"회\n🍱파괴한 미스터리 상자: "+ json.mystery_chests_destroyed +"개\n⛏️파괴한 광물: "+ json.ores_mined +"개\n🪄사용한 마법: "+ json.spells_used +"개\n⭐제한 XP: "+ json.uncapped_xp);
      
}

if(msg.indexOf("/실적 더하이브 월별 깃발잡기 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 월별 깃발잡기 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/ctf/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 깃발잡기, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🫴팀원 도운 횟수: "+ json.assists +"회\n🔪죽은 횟수: "+ json.deaths +"회\n🚩잡은 깃발: "+ json.flags_captured +"개\n🏳️반환된 깃발: "+ json.flags_returned +"개\n🔪킬 수: "+ json.kills +"회");
      
}

if(msg.indexOf("/실적 더하이브 월별 드랍 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 월별 드랍 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/drop/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 드랍, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n⛏️파괴한 블럭: "+ json.blocks_destroyed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n🤑얻은 파워업: "+ json.powerups_collected +"개\n🪶사용한 껑충뛰기: "+ json.vaults_used + "개");
      
}

if(msg.indexOf("/실적 더하이브 월별 그라운드워즈 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 월별 그라운드워즈 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/ground/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 그라운드워즈, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n⛏️파괴한 블럭: "+ json.blocks_destroyed +"개\n🚧설치한 블럭: "+ json.blocks_placed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n🏐던진 발사체: "+ json.projectiles_fired + "개");
      
}

if(msg.indexOf("/실적 더하이브 월별 건축 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 월별 건축 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/monthly/player/build/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ json.username +"님의 더하이브 실적\n🔍 필터: 월별, 건축, 개인별\n\n🗒순위: "+ json.human_index + "등\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🟩LOVE: "+ json.rating_love_received +"\n🟨GOOD: "+ json.rating_good_received +"\n🟧OKAY: "+ json.rating_okay_received +"\n🟥MEH: "+ json.rating_meh_received +"\n⭐제한 XP: "+ json.uncapped_xp);
      
}
//플레이어 전체
if(msg.indexOf("/실적 더하이브 전체 트레져워즈 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 전체 트레져워즈 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/all/wars/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 트레져워즈, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪파이널 킬 수: "+ json.final_kills +"회\n🔪킬 수: "+ json.kills +"회\n🔨파괴한 보물: "+ json.treasure_destroyed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n👑Prestige 단계: "+ json.prestige);
      
  }
  
  if(msg.indexOf("/실적 더하이브 전체 데스런 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 전체 데스런 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/all/dr/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 데스런, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪킬 수: "+ json.kills +"회\n🚪통과한 체크포인트: "+ json.checkpoints +"개\n🔪죽은 횟수: "+ json.deaths +"회");
      
  }
  
  if(msg.indexOf("/실적 더하이브 전체 숨바꼭질 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 전체 숨바꼭질 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/all/hide/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 숨바꼭질, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪숨은사람 킬 수: "+ json.hider_kills +"회\n🔪술래 킬 수: "+ json.seeker_kills +"회\n🔪죽은 횟수: "+ json.deaths +"회");
      
  }
  
  if(msg.indexOf("/실적 더하이브 전체 서바이벌게임 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 전체 서바이벌게임 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/all/sg/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 서바이벌게임, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n📦연 상자: "+ json.crates +"개\n🐄잡은 소: "+ json.cows +"마리\n🔪킬 수: "+ json.kills +"회");
      
  }
  
  if(msg.indexOf("/실적 더하이브 전체 머더 개인별 ")==0){
      msg=msg.replace("/실적 더하이브 전체 머더 개인별 ", "");
      var data = Utils.getWebText("https://api.playhive.com/v0/game/all/murder/"+msg);
      var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var json = JSON.parse("{"+data2+"}");
      replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 머더, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪죽은 횟수: "+ json.deaths +"회\n🤑얻은 동전: "+ json.coins +"개\n📍머더: "+ json.murders +"번\n🔪죽인 머더: "+ json.murderer_eliminations +"명");
      
  }
  
  if(msg.indexOf("/실적 더하이브 전체 스카이워즈 개인별 ")==0){
        msg=msg.replace("/실적 더하이브 전체 스카이워즈 개인별 ", "");
        var data = Utils.getWebText("https://api.playhive.com/v0/game/all/sky/"+msg);
        var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
        var json = JSON.parse("{"+data2+"}");
        replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 스카이워즈, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🔪킬 수: "+ json.kills +"회\n🍱파괴한 미스터리 상자: "+ json.mystery_chests_destroyed +"개\n⛏️파괴한 광물: "+ json.ores_mined +"개\n🪄사용한 마법: "+ json.spells_used +"개");
        
  }
  
  if(msg.indexOf("/실적 더하이브 전체 깃발잡기 개인별 ")==0){
        msg=msg.replace("/실적 더하이브 전체 깃발잡기 개인별 ", "");
        var data = Utils.getWebText("https://api.playhive.com/v0/game/all/ctf/"+msg);
        var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
        var json = JSON.parse("{"+data2+"}");
        replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 깃발잡기, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🫴팀원 도운 횟수: "+ json.assists +"회\n🔪죽은 횟수: "+ json.deaths +"회\n🚩잡은 깃발: "+ json.flags_captured +"개\n🏳️반환된 깃발: "+ json.flags_returned +"개\n🔪킬 수: "+ json.kills +"회");
        
  }
  
  if(msg.indexOf("/실적 더하이브 전체 드랍 개인별 ")==0){
        msg=msg.replace("/실적 더하이브 전체 드랍 개인별 ", "");
        var data = Utils.getWebText("https://api.playhive.com/v0/game/all/drop/"+msg);
        var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
        var json = JSON.parse("{"+data2+"}");
        replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 드랍, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n⛏️파괴한 블럭: "+ json.blocks_destroyed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n🤑얻은 파워업: "+ json.powerups_collected +"개\n🪶사용한 껑충뛰기: "+ json.vaults_used + "개");
        
  }
  
  if(msg.indexOf("/실적 더하이브 전체 그라운드워즈 개인별 ")==0){
        msg=msg.replace("/실적 더하이브 전체 그라운드워즈 개인별 ", "");
        var data = Utils.getWebText("https://api.playhive.com/v0/game/all/ground/"+msg);
        var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
        var json = JSON.parse("{"+data2+"}");
        replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 그라운드워즈, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n⛏️파괴한 블럭: "+ json.blocks_destroyed +"개\n🚧설치한 블럭: "+ json.blocks_placed +"개\n🔪죽은 횟수: "+ json.deaths +"회\n🏐던진 발사체: "+ json.projectiles_fired + "개");
        
  }
  
  if(msg.indexOf("/실적 더하이브 전체 건축 개인별 ")==0){
        msg=msg.replace("/실적 더하이브 전체 건축 개인별 ", "");
        var data = Utils.getWebText("https://api.playhive.com/v0/game/all/build/"+msg);
        var data2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
        var json = JSON.parse("{"+data2+"}");
        replier.reply("[🧪실험 기능] 문제가 있을 경우 제보해주세요!\n[✏] "+ msg + "\n(" + json.UUID +")\n님의 더하이브 실적\n🔍 필터: 전체, 건축, 개인별\n\n🚪시작: "+ new Date(json.first_played*1000) + "\n⭐XP: "+ json.xp +"\n▶️플레이 수: "+ json.played +"회\n🏆우승한 수: "+ json.victories +"회\n🟩LOVE: "+ json.rating_love_received +"\n🟨GOOD: "+ json.rating_good_received +"\n🟧OKAY: "+ json.rating_okay_received +"\n🟥MEH: "+ json.rating_meh_received);
        
  }

//리더보드 월별
if(msg.indexOf("/실적 더하이브 월별 트레져워즈 리더보드")==0){
      var ddata = Utils.getWebText("https://api.playhive.com/v0/game/monthly/wars");
      var ddata2 = data.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace(/,/g, "\",\"").replace(/:/g, "\":\"").replace(/}/g, "\"}").replace(/\"\"\"/g, "\"").replace(/\"\"/g, "\"").split("{")[1].split("}")[0].trim();
      var djson = JSON.parse("{"+ddata2+"}");
      for (var i in datas["djson"]) {  
        var keywordData = datas["djson"][i]
        var str = keywordData["human_index"] + "등 " + keywordData["username"];
        keywords.push(str); 
      }
      replier.reply(keywords.join("\n"));
}

//리더보드 전체
//개발 진행 중에 중단되었습니다. 알아서 수정해주세요!
if(msg.indexOf("/실적 더하이브 전체 트레져워즈 리더보드")==0){
  var ddata = Utils.getWebText("https://api.playhive.com/v0/game/all/wars");
  var ddata2 = ddata.replace("<html>", "").replace("</html>", "").replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").split("{")[1].split("}")[0].trim();
  var djson = JSON.parse("{"+ddata2+"}");
  for (var i in datas["djson"]) {  
    var keywordData = datas["djson"][i]
    var str = keywordData["human_index"] + "등 " + keywordData["username"];
    replier.reply(keywords.join("\n"));
  }
 
}

}
catch(e){ 
  if (e.message.includes('404')) {
    replier.reply
	(
		"❌ 해당 플레이어의 정보를 찾을 수 없습니다!\n정확한 게이머태그인지, 이번달에 게임을 했는지 확인해보세요!"
	); 
  Api.reload(scriptName); 
    }else{
  replier.reply
	(
		"❌ 앗! 야생의 " + e.name + " 오류가 발생했다!\n\n" + 
		"내용 : " + e.message + "\n\n" +
		"코드라인 : " + e.lineNumber
	); 
  Api.reload(scriptName); }
   }}
   
//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
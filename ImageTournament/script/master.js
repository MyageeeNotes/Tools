var findOutRank = 0;  // 次に見つけ出すランク
var ranking = {};     // ポイントごとの画像
var candidates = [];  // 比べる画像候補
var onFiled = [0, 0]; // 現在表示中の画像パス
var onFiled_num = 0;

$(function () {
  findOutRank = 1;
  $("#findOutRank").text(findOutRank);
  rankingUpdate();
});

function battleStart() {
  candidates = getCandidates();
  battle();
}

function battle() {
  if (candidates.length == 0) {
    findOutRank += 1;
    if (getCandidates.length == 1) {
      console.log('END::');
    }
  } else {
    onFiled[0] = candidates[onFiled_num * 2];
    onFiled[1] = candidates[onFiled_num * 2 + 1];
    setImage();
  }
}

function selectImage(target) {
  images[onFiled[target]] += 1;
  onFiled_num += 1;
  rankingUpdate();
  battle();
}

function setImage() {
  $("#battle_field td.image.a")
    .css('background-image', "url('images/"+ onFiled[0] +"')")
    .text(onFiled[0]);
  $("#battle_field td.image.b")
    .css('background-image', "url('images/"+ onFiled[1] +"')")
    .text(onFiled[1]);
}
function getCandidates() {
  var cds = [];
  for (var key in images){
    if (images[key] == findOutRank - 1) {
      cds[cds.length] = key;
    }
  }
  // force cds to even number
  if (cds.length % 2 != 0) {
    for (var key in images){
      if (images[key] == findOutRank - 1) {
        cds[cds.length] = key;
        break;
      }
    }
  }
  onFiled_num = 0;
  return cds;
}

function rankingUpdate() {
  // Count Images each points
  ranking = {}
  var target = false;
  for (var key in images) {
    // 'ranking' dict has this point
    target = ranking[images[key]];
    if(target){
      target[target.length] = key;
    } else {
      ranking[images[key]] = [key];
    }
  }
  // Rearrange images with points desc
  var point_list = [];
  for (var key in ranking) {
    point_list[point_list.length] = key;
  }
  point_list.sort(function(x,y){
        if( x > y ) return -1;
        if( x < y ) return 1;
        return 0;
  });
  // Append DOM elements
  $("#ranking").html('');
  for (var i = 0; i < point_list.length; i++) {
    $("#ranking").append($("<h3></h3>").text("Points " + point_list[i]));
    $("#ranking").append($("<hr/>"));
    for (var j = 0; j < ranking[point_list[i]].length; j++) {
      $("#ranking").append($("<img/>").attr('src', 'images/' + ranking[point_list[i]][j]));
    }
  }
}

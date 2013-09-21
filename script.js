var descriptors;

function roll() {
  $(".current-result").html("");

  var total = 0, mod = 0;

  var ul = $("<ul/>").addClass("roll-results");

  for (var idx = 0; idx < descriptors.length; ++idx) {
    mod += descriptors[idx].modifier;
    for (var idxQ = 0; idxQ < descriptors[idx].quantity; ++idxQ) {
      var n = Math.floor(Math.random() * descriptors[idx].sides + 1);
      total += n;
      $("<li><span class='num'/><span class='den'/></li>")
        .find(".num").text(n).end()
        .find(".den").text("/" + descriptors[idx].sides).end()
        .appendTo(ul);
    }
  }

  ul.appendTo(".current-result");

  $("<div><span class='msg'/><span class='total'/></div>")
    .addClass("total-display")
    .find(".msg").text("Total=" + (mod ? total + "+" + mod + "=": "")).end()
    .find(".total").text(total + mod).end()
    .appendTo(".current-result");
}

$(function() {
  $("#roll-descriptor").on("change keyup", function() {
    var string = $("#roll-descriptor").val();

    try {
      descriptors = descriptorParser.parse(string);
      $(".input button").removeClass("disabled");
    }
    catch (e) {
      $(".input button").addClass("disabled");
    }
  });

  $(document).on("click", ".input button:not(.disabled)", roll);
  $(document).on("keyup", "#roll-descriptor", function(evt) {
    if(evt.keyCode == 13 && $(".input button").is(":not(.disabled)")) {
      roll();
    }
  });

  $("#roll-descriptor").focus();
});

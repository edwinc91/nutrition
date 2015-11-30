$(function() {
  // alert("This is working");
  var i = $('#nutritionForm').children().length + 1;
  console.log(i);
  $(".addFood").on("click", function(e) {
    var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'nutritionForm' + i);

	newTextBoxDiv.after().html('<label for="threadTitle">Consumed Goods </label><input type="text" class="form-control" name="nutrition[food' + i + ']" >');
	newTextBoxDiv.appendTo("#nutritionForm");
     });

 $(".addFood").on("click", function(e) {
       var newTextBoxDiv = $(document.createElement('div'))
   	     .attr("id", 'nutritionForm' + i);

   	newTextBoxDiv.after().html('<label for="threadBody">Calories</label><input type="text" class="form-control" name="nutrition[nutrition' + i + ']" >');
   	newTextBoxDiv.appendTo("#nutritionForm" + i);

   	i++;
    });

     $(".removeFood").click(function () {
	if(i==1){
          alert("Can't Remove!");
          return false;
       }

	i--;

    $("#nutritionForm" + i).remove();
    $("#nutritionForm" + i).remove();

 });

 $("#updateCalories").on("click", function(e) {
   var totalCalories = parseInt($(".calorie1").text());
   var a = parseInt($(".calorie1").text()),
       b = parseInt($(".calorie2").text()),
       c = parseInt($(".calorie3").text()),
       d = parseInt($(".calorie4").text()),
       e = parseInt($(".calorie5").text());
       console.log (parseInt(a), b, c, d, e);
       console.log (parseInt(a) + parseInt(b));
       console.log (isNaN(b));

   if (isNaN(e) == false) {
     totalCalories = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e)
   } else if (isNaN(d) == false) {
     totalCalories = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d)
   } else if (isNaN(c) == false) {
     totalCalories = parseInt(a) + parseInt(b) + parseInt(c)
   } else if (isNaN(b) == false) {
     totalCalories = parseInt(a) + parseInt(b)
   } else {
     totalCalories = parseInt(a)
   }
   console.log(totalCalories);
   if (totalCalories >= 3000) {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    (づ￣ ³￣)づ");
   } else if (totalCalories > 2500 && totalCalories < 3000) {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    (ಥ﹏ಥ)");
   } else if (totalCalories > 2000 && totalCalories < 2501) {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    (ಠ_ಠ)");
   } else if (totalCalories > 1750 && totalCalories < 2001) {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    ლ(´ڡ`ლ)");
   } else if (totalCalories > 1500 && totalCalories < 1751) {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    ◕‿↼");
   } else {
     $(".calorieCount").text("Total Calories Consumed: " + totalCalories + "    ◕‿◕");
   }
 });
});

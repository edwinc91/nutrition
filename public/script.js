$(function() {
  // alert("This is working");
  var i = $('.addFood').size() + 1;
  // console.log(i);
  $(".addFood").on("click", function(e) {
    var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'nutritionForm' + i);

	newTextBoxDiv.after().html('<label for="threadTitle">Consumed Goods</label><input type="text" class="form-control" name="nutrition[food' + i + ']" >');
	newTextBoxDiv.appendTo("#nutritionForm");
     });
 $(".addFood").on("click", function(e) {
       var newTextBoxDiv = $(document.createElement('div'))
   	     .attr("id", 'nutritionForm' + i);

   	newTextBoxDiv.after().html('<label for="threadBody">Calories</label><input type="text" class="form-control" name="nutrition[nutrition' + i + ']" >');
   	newTextBoxDiv.appendTo("#nutritionForm");

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
});

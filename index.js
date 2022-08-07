
$('#username').on('input propertychange paste', function() {
    fetchBackground();
    fetchData();
});



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  

async function fetchBackground() {

    const res = await fetch ("https://api.scratch.mit.edu/users/" + $("#username").val() + "/projects");
    const record = await res.json();
    $("body").css("background-image", 'url("' + record[Math.floor(Math.random() * (record.length - 1))].image + '")');
    $("#user").css("color", getRandomColor());
    $("#country").css("color", getRandomColor());
    $("#status").css("color", getRandomColor());
}


async function fetchData() {
    const res=await fetch ("https://api.scratch.mit.edu/users/" + $("#username").val());
    const record=await res.json();
    if (record.code === "NotFound"){
        $("#user").text("User Not Found");
    }    
    
    $("#user").text(record.username);
    $("#pic").attr("src", record.profile.images["90x90"]);
    $("#country").text(record.profile.country);
    $("#country-icon").attr("src", "https://www.countryflagsapi.com/png/" + encodeURIComponent(record.profile.country));
    $("#status").text(record.profile.status);
}

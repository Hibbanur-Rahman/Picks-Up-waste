// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  //for timer

  var timer = document.getElementById("timer");
  var minute = 0;
  var second = 0;
  setInterval(() => {
    if (second < 9) {
      timer.innerHTML = minute + ":0" + (second + 1);
    } else {
      timer.innerHTML = minute + ":" + (second + 1);
    }
    second++;
    if (second >= 59) {
      minute++;
      second = -1;
    }
  }, 1000);

  
  // Get references to the trash image and all draggable items
  const trash = document.getElementById("trash-img");
  const draggableItems = document.querySelectorAll("[draggable='true']");

  // Add event listeners to all draggable items
  draggableItems.forEach((item) => {
    // When a draggable item starts being dragged
    item.addEventListener("dragstart", (event) => {
      // Set the data being dragged (the item's ID)
      event.dataTransfer.setData("text/plain", event.target.id);
    });
  });

  // Add event listeners to the trash image
  trash.addEventListener("dragover", (event) => {
    // Prevent default behavior (required for drop to work)
    event.preventDefault();
  });

  trash.addEventListener("drop", (event) => {
    // Prevent default behavior (required for drop to work)
    event.preventDefault();

    // Get the ID of the dragged item
    const itemId = event.dataTransfer.getData("text");

    // Check if the dropped item is a garbage item
    if (itemId.startsWith("garbage-item")) {
      // Increase score or perform other actions
      console.log("Garbage item dropped into the trash!");
      // alert('Garbage item dropped into the trash!')
      var gif = document.querySelector("#gif");
      var win = document.querySelector(".win");
      var awesomeSound = document.querySelector("#awesomeSound");
      awesomeSound.play();
      win.style.display = "block";
      gif.style.display = "block";
      butterup.toast({
        title: "",
        message: "Garbage item dropped into the trash!",
        type: "success",
        icon: true, // default: false
        location: "top-center",
        dismissable: true,
      });

      // Hide the gif after 2 seconds
      setTimeout(function () {
        gif.style.display = "none";
        win.style.display = "none";
      }, 2000);
    } else {
      // Handle dropping of non-garbage items (e.g., normal items)
      console.log("Non-garbage item dropped.");
      var lose = document.querySelector(".lose");
      var yuckySound = document.querySelector("#yuckySound");
      yuckySound.play();
      lose.style.display = "block";
      butterup.toast({
        title: "",
        message: "Non-garbage item dropped",
        type: "error",
        icon: true, // default: false
        location: "top-center",
        dismissable: true,
      });

      // Hide the gif after 2 seconds
      setTimeout(function () {
        lose.style.display = "none";
      }, 2000);
    }
  });
});

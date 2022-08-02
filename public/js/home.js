function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        // img.src = array[i];
        document.querySelector(`.row${i}`).src = array[i]
    }
}

preloadImages(["/home/add.PNG","/home/preview.PNG","/home/comments.PNG","/home/simulator.PNG"])

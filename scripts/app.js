$("#btnsave").click(function() {
    $("#copypad").append(
        "<div class='col-lg-4 btn btn-primary btn-lg m-1' style='user-select:all' onclick='copyme()'>" + $("#textpad").val() + "</div>"
    );
    $("#textpad").val("");
    //document.execCommand("Copy");
});

function copyme() {
    document.execCommand("Copy");
}




var app = function() {
    //private members 
    appName = "CopyPad";

    displayTitle = function() {
        alert(this.title);
    }

    //public API    

    return {
        title: title,
        displayTitle: displayTitle
    };
}();

var localStorageService = function() {
    //private members 
    appName = "CopyPad";

    getData = function(key) {
        return localStorage.getItem(key);
    }

    setData = function(key, data) {
        return localStorage.setItem(key, data);
    }

    //public API    

    return {
        title: title,
        getData: getData,
        setData: setData
    };
}();
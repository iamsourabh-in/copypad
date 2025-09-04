$(document).ready(function () {
    // Sidebar toggle
    $('#sidebarToggle').click(function () {
        $('.sidebar').toggleClass('collapsed');
        $('.main-content').toggleClass('collapsed');
        $('.footer').toggleClass('collapsed');
    });

    // Save Category
    $('#SaveCategory').click(function () {
        var cat = $('#categoryinput').val();
        if (cat == null || cat == "") {
            alert("Input is not valid");
        } else {
            let showData = JSON.parse(localStorage.getItem("padData"));
            showData[cat] = [];
            localStorage.setItem("padData", JSON.stringify(showData));
            $('#categoryinput').val("");
            var myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.hide();
            location.reload();
        }
    });

    var showData = JSON.parse(localStorage.getItem("padData"));
    var selectedKey = "Dashboard";

    // Save button click
    $('#btnsave').click(function () {
        if (selectedKey == null || selectedKey == "" || selectedKey == "Dashboard") {
            alert("Please select a Valid category, And then Add the Command");
        } else {
            showData = JSON.parse(localStorage.getItem("padData"));
            showData[selectedKey].push($("#textpad").val());
            localStorage.setItem("padData", JSON.stringify(showData));
            $("#textpad").val("");
            ListData(selectedKey);
        }
    });

    // Initialize data
    let check = JSON.parse(localStorage.getItem("padData"));
    if (check == null || check == undefined || check == "") {
        var data = {
            Dashboard: [],
        };
        localStorage.setItem("padData", JSON.stringify(data));
        showData = data;
    }

    // Populate sidebar
    for (let key in showData) {
        $("#sidenavbar").append(
            '<a href="#" class="category-link" data-key="' + key + '"><span class="material-icons">folder</span><span class="category-text">' + key + '</span></a>'
        );
    }

    // Sidebar link click
    $('#sidenavbar').on('click', '.category-link', function() {
        var key = $(this).data('key');
        ListData(key);
    });

    // List data function
        // List data function
    window.ListData = function (key) {
        let padData = JSON.parse(localStorage.getItem("padData"));
        selectedKey = key;
        $("#copypad").html("");
        if (selectedKey == "Dashboard") {
            for (const [key, value] of Object.entries(padData)) {
                if (key == "Dashboard") continue;
                $("#copypad").append(
                    '<div class="col-lg-3 col-md-6 mb-4"><div class="card category-card" data-key="' + key + '"><div class="card-body"><h5 class="card-title">' +
                    key +
                    '</h5><h6 class="card-subtitle mb-2 text-muted">' +
                    value.length +
                    " items</h6></div></div></div>"
                );
            }
        } else {
            var commandList = padData[selectedKey];
            for (var i = 0; i < commandList.length; i++) {
                $("#copypad").append(
                    '<div class="col-lg-3 col-sm-12 col-md-6 btn btn-info m-1" style="user-select:all" onclick="copyme(this)">' +
                    commandList[i] +
                    "</div>"
                );
            }
        }
    };

    $('#copypad').on('click', '.category-card', function() {
        var key = $(this).data('key');
        ListData(key);
    });

    window.copyme = function(element) {
        const textToCopy = element.innerText;
        navigator.clipboard.writeText(textToCopy).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };


    // Initial load
    ListData("Dashboard");
});
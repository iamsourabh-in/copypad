
// Modular JS for CopyPad
class CopyPad {
    constructor() {
        this.padData = JSON.parse(localStorage.getItem("padData")) || { Dashboard: [] };
        this.selectedKey = "Dashboard";
        this.init();
    }

    init() {
        this.renderCategories();
        this.bindEvents();
        this.renderPad(this.selectedKey);
    }

    renderCategories() {
        const categoryList = document.getElementById("categoryList");
        categoryList.innerHTML = "";
        Object.keys(this.padData).forEach(key => {
            const a = document.createElement("a");
            a.textContent = key;
            a.onclick = () => {
                this.selectedKey = key;
                this.renderPad(key);
            };
            categoryList.appendChild(a);
        });
    }

    renderPad(key) {
        const copypad = document.getElementById("copypad");
        copypad.innerHTML = "";
        if (key === "Dashboard") {
            Object.entries(this.padData).forEach(([cat, cmds]) => {
                if (cat === "Dashboard") return;
                const card = document.createElement("div");
                card.className = "card m-3";
                card.style.width = "18rem";
                card.onclick = () => {
                    this.selectedKey = cat;
                    this.renderPad(cat);
                };
                card.innerHTML = `<div class='card-body'><h5 class='card-title'>${cat}</h5><h6 class='card-subtitle mb-2 text-muted'>${Array.isArray(cmds) ? cmds.length : 0} commands</h6></div>`;
                copypad.appendChild(card);
            });
        } else {
            if (!Array.isArray(this.padData[key])) return;
            this.padData[key].forEach(cmd => {
                const btn = document.createElement("div");
                btn.className = "btn btn-primary btn-lg m-1";
                btn.style.userSelect = "all";
                btn.textContent = cmd;
                btn.onclick = () => this.copyToClipboard(cmd);
                copypad.appendChild(btn);
            });
        }
    }

    bindEvents() {
        document.getElementById("btnCategory").onclick = () => {
            document.getElementById("myModal").style.display = "block";
        };
        document.querySelector(".close").onclick = () => {
            document.getElementById("myModal").style.display = "none";
        };
        window.onclick = (event) => {
            if (event.target === document.getElementById("myModal")) {
                document.getElementById("myModal").style.display = "none";
            }
        };
        document.getElementById("categoryForm").onsubmit = (e) => {
            e.preventDefault();
            const cat = document.getElementById("categoryinput").value.trim();
            if (!cat) return alert("Input is not valid");
            if (!this.padData[cat]) {
                this.padData[cat] = [];
                this.saveData();
                this.renderCategories();
                document.getElementById("categoryinput").value = "";
                document.getElementById("myModal").style.display = "none";
            } else {
                alert("Category already exists!");
            }
        };
        document.getElementById("saveForm").onsubmit = (e) => {
            e.preventDefault();
            if (!this.selectedKey || this.selectedKey === "Dashboard") {
                alert("Please select a valid category, then add the command.");
                return;
            }
            const val = document.getElementById("textpad").value.trim();
            if (!val) return;
            this.padData[this.selectedKey].push(val);
            this.saveData();
            document.getElementById("textpad").value = "";
            this.renderPad(this.selectedKey);
        };
    }

    saveData() {
        localStorage.setItem("padData", JSON.stringify(this.padData));
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new CopyPad();
});
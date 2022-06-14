const qlist = document.getElementById("qlist")
const currpage = document.getElementById("currpage")
const totalpage = document.getElementById("totalpage")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

var qs = [];
var nowPage = 0;

const sectionCode1 = `<li class="row center"> \
                        <textarea id="quoteInput`;

const sectionCode1_1 = `" class="quote-input">`;

const sectionCode2 = `</textarea> \
                        <button id="`;

const sectionCode3 = `" class="scaleBtn">DELETE</button> \
                    <button id="M`;
const sectionCode4 = `" class="scaleBtn">MODIFY</button>
                    </li>`;

function initQuestionList() {
    getQuestionList().then(qstr => {
        const qobj = JSON.parse(qstr) || {};
        qs = Object.values(qobj);
        changePage(1);
    })
}

function changePage(page) {
    const total = Math.ceil(qs.length / 10);
    if (page < 0 || !page && total || page > total) return false;

    let htmlText = "";
    nowPage = page;

    if (page != 0) {
        let start = (page - 1) * 10;
        for (let i = start; i < start + 10 && i < qs.length; ++i) {
            const obj = qs[i];
            htmlText += sectionCode1 + obj._id + sectionCode1_1 + obj.content + sectionCode2 + obj._id + sectionCode3 + obj._id + sectionCode4;　　　　
        }
    }

    currpage.innerText = `${nowPage}/`;
    totalpage.innerText = total;
    qlist.innerHTML = htmlText;

    return true;
}

function deleteQuestion(id) {
    const rm = qs.filter(item => item._id == id);
    if (!rm.length) return;
    qs = qs.filter(item => item._id != id);

    removeQuestion(id).then(res => {
        if (!changePage(nowPage)) {
            changePage(Math.ceil(qs.length / 10));
        }

        const obj = JSON.parse(res);
        alert(obj.msg)
    });
}

initQuestionList()

prevBtn.addEventListener("click", (e) => {
    changePage(nowPage - 1)
})

nextBtn.addEventListener("click", (e) => {
    changePage(nowPage + 1)
})

$(document).on("click", "button", function() {
    if (this.innerText == "DELETE") {
        deleteQuestion(this.id);
    }
    if (this.innerText == "MODIFY") {
        //alert(this.id.substring(1));
        let qid = this.id.substring(1);
        let customInputer = document.getElementById("quoteInput" + qid);
        if (customInputer.value && customInputer.value.trim()) {
            addQuestion(customInputer.value, qid).then(res => {
                const obj = JSON.parse(res);
                alert(obj.msg)
            });
        } else {
            alert("Error! The input cannot be empty!")
        }

    }
});
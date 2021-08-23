console.log("hello");
shownotes();
//if a user adds note, add it to local storage

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function () {
    let addtxt = document.getElementById("addTxt");
    let titletxt=document.getElementById("titleTxt");
    if (addtxt.value == "" || titletxt.value=="") {
        alert("Please Enter The Note or Note title  FIrst")
    }
    else {
        let lsnotes = localStorage.getItem("lsnotes");
        if (lsnotes == null) {
            objnotes = [];
        }
        else {
            objnotes = JSON.parse(lsnotes);
        }

        let obj=
        {
            textval:addtxt.value,
            titleval:titletxt.value,
             date:new Date().toDateString()
        };
        objnotes.push(obj);
        localStorage.setItem("lsnotes", JSON.stringify(objnotes));
        addtxt.value = "";
        titletxt.value="";
        shownotes();
    }

})

//function to show notesfrom local storage

function shownotes() {
    let lsnotes = localStorage.getItem("lsnotes");
    if (lsnotes == null) {
        objnotes = []
    }
    else {
        objnotes = JSON.parse(lsnotes)
    }
    let html = "";
    objnotes.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.titleval}</h5>
              <h5 class="card-text"><i>${element.date}</i></h5>
              <p class="card-text">${element.textval}</p>
            <button id="${index}" onclick="deletenode(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
            </div>
        `
    })
    let notediv = document.getElementById("notes");
    if (objnotes.length == 0) {
        notediv.innerHTML = 'No Notes To Display.... Plesae Add New Notes using "Add A Note Section"'
    }
    else {
        notediv.innerHTML = html;
    }

}

//function to delete a note from local storage

function deletenode(index) {
    console.log("im deleting note", index)

    let lsnotes = localStorage.getItem("lsnotes");
    if (lsnotes == null) {
        objnotes = [];
    }
    else {
        objnotes = JSON.parse(lsnotes)
    }

    objnotes.splice(index, 1);
    localStorage.setItem("lsnotes", JSON.stringify(objnotes))
    shownotes();
}

//searching the text

let searchtext=document.getElementById("searchTxt")

searchtext.addEventListener("input",function()
{
    let searchval=searchtext.value.toLowerCase();
    let card=document.getElementsByClassName("notecard");
    Array.from(card).forEach(function(element)
    {
        let cardtext=element.getElementsByTagName("p")[0].innerText;
        if(cardtext.includes(searchval))
        {
            element.style.display="block"
        }
        else
        {
            element.style.display="none"
        }
    })
})




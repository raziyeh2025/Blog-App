const divPosts = document.getElementById("div-posts");
const form = document.getElementById("form-input");
const btnAdd = document.getElementById("btn-add");
const btnEdit = document.getElementById("btn-edit");
const inptTitle = document.getElementById("input-title");
const inputContent = document.getElementById("input-content");
var editIndex = -1;
UpdateView();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = inptTitle.value.trim();
  const content = inputContent.value.trim();
  if (title === null || content === "") return;
  SaveToLocalStorage(title, content);
  UpdateView();
});
function ReadLocalStorage() {
  var postsArray = [];
  var posts = localStorage.getItem("posts");
  if (posts) postsArray = JSON.parse(posts);
  return postsArray;
}
function DeletePost(index) {
  var postsArray = ReadLocalStorage();
  postsArray.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(postsArray));
  UpdateView();
}
function SaveToLocalStorage(title, content) {
  var postsArray = ReadLocalStorage();
  var newPost = { title: title, content: content };
  postsArray.push(newPost);
  localStorage.setItem("posts", JSON.stringify(postsArray));
  inptTitle.value = "";
  inputContent.value = "";
}
function UpdateView() {
  var postsArray = ReadLocalStorage();
  if (!postsArray) return;
  divPosts.innerHTML = "";
  postsArray.forEach((element, index) => {
    var newPost = document.createElement("div");
    newPost.innerHTML = `<div class="col-xs-11 col-sm-11 col-md-3 col-lg-3 post">
                <div class="row post-header" >
                    <span class="title text-capitalize " >${element.title}</span>
                    <span class="delete" onclick="DeletePost(${index})" >🗑</span>
                    <span class="edit" onclick="EditPost(${index})">✎</span>
                </div><hr>
                <p class="content" style="text-align: justify;">${element.content}</p>
            </div>`;
    divPosts.appendChild(newPost);
  });
}
function EditPost(index) {
  editIndex = index;
  var postsArray = ReadLocalStorage();
  inptTitle.value = postsArray[index].title;
  inputContent.value = postsArray[index].content;
  btnEdit.style.visibility = "visible";
  btnAdd.disable = "disable";
}
btnEdit.addEventListener("click", () => {
  var postsArray = ReadLocalStorage();
  const title = inptTitle.value.trim();
  const content = inputContent.value.trim();
  if (title != "" && content != "") {
    postsArray[editIndex].title = title;
    postsArray[editIndex].content = content;
  }
  inptTitle.value = "";
  inputContent.value = "";
  localStorage.setItem("posts", JSON.stringify(postsArray));
  btnEdit.style.visibility = "hidden";
  UpdateView();
});

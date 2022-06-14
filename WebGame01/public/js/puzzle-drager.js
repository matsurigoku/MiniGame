const dropbox = document.getElementById("preview_image");

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) return;
    dropbox.classList.add("upload_zone_enter");
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragleave(e) {
    dropbox.classList.remove("upload_zone_enter");
}

function handleFiles(files) {
    const [file] = files;
    const imageType = /image.*/;

    if (!file || !file.type.match(imageType)) return;

    // 修改原圖
    previewImg.file = file
    previewImg.src = URL.createObjectURL(file);
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) {
        alert("遊戲進行中不可更改!")
        return;
    }

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
    dropbox.classList.remove("upload_zone_enter");
}

dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);
dropbox.addEventListener("dragleave", dragleave);
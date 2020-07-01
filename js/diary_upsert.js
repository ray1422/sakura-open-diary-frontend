$(document).ready(() => {
    JWT.refresh()
    const diaryID = new URLSearchParams(window.location.search).get("id");
    const groupID = new URLSearchParams(window.location.search).get("group");
    let keep_update_tmp_save = true
    isInsert = diaryID === null
    const url = `/diary/${isInsert ? '' : diaryID}`

    if (!isInsert) {
        JWT.ajax({
            type: "GET",
            url: url,
            data: ""
        }).done((data) => {
            $("#editor").val(data.content)
            $("#editor").height($("#editor")[0].scrollHeight).attr("disabled", false)
        }).fail((data, _) => {
            document.location.href = "login.html";
        })
    } else {
        $("#editor").height($("#editor")[0].scrollHeight).attr("disabled", false)
        $("#delete").hide()
        console.log(localStorage)
        if (window.localStorage.getItem("new_diary_tmp") != null && window.localStorage.getItem("new_diary_tmp_id") == groupID) {
            let content = window.localStorage.getItem("new_diary_tmp");
            $("#editor").val(content)
        } else {
            localStorage.setItem('new_diary_tmp_id', groupID);
            localStorage.setItem('new_diary_tmp', "");
        }

        setInterval(() => {
            if (!keep_update_tmp_save) return 
            localStorage.setItem('new_diary_tmp_id', groupID);
            localStorage.setItem('new_diary_tmp', $("#editor").val());
        });

    }
    $("#delete").click(function (event) {
        event.preventDefault()
        if (!window.confirm("真的要刪除嗎？")) return
        JWT.ajax({
            url: url,
            type: "DELETE"
        }).done(function () {
            window.location.href = document.referrer + "#" + Math.random()

        }).fail(function () {
            alert("不知道哪裡出錯了！")
        })
    })
    $("#save").click(function (event) {
        $("#save, #editor").attr("disabled", true)
        event.preventDefault()
        JWT.ajax({
            type: isInsert ? "POST" : "PATCH",
            url: url,
            data: {
                content: $("#editor").val(),
                group_id: groupID
            }
        }).done((data) => {
            keep_update_tmp_save = false
            localStorage.setItem('new_diary_tmp_id', groupID);
            localStorage.setItem('new_diary_tmp', "");
            window.location.href = document.referrer + "#" + Math.random()
        }).fail((data, _) => {
            console.log(data)
            alert("不知道哪裡出錯了！" + _)
            $("#save, #editor").attr("disabled", false)
        })
    })


})
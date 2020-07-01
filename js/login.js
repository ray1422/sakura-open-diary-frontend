$(document).ready(function () {
    $("#year_now").text(new Date().getFullYear())
    $("form").submit($("#login").click)
    $("#login").click(function (event) {
        event.preventDefault()
        const username = $("#username").val()
        const password = $("#password").val()
        $("#login, #username, #password").attr("disabled", true)
        JWT.ajax({
            type: "POST",
            url: "/api/auth/jwt/login",
            data: {
                username: username,
                password: password
            }
        }).done((data) => {
            JWT.setToken(data.access)
            JWT.setRefresh(data.refresh)
            $.cookie("username", $("#username").val(), { expires: 28 })
            console.log(data)
            $("#login").text("登入了！轉址中..")
            window.location.href = "diary_group.html"
        }).fail((data, _) => {
            if (data.status == 401) {
                alert("無法登入！可能是打錯帳號或密碼了！")
            } else {
                alert("不知道哪裡出錯了！")
                console.log(data)
            }
        }).always(() => {
            $("#login, #username, #password").attr("disabled", false)
        })
    })
})

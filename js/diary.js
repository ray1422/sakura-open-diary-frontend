$(document).ready(() => {
    JWT.refresh()
    const groupID = new URLSearchParams(window.location.search).get("id");
    $("#new_diary").attr("href", `diary_upsert.html?group=${groupID}`)
    var nextUrl = "/diary/group/" + groupID + "/diaries/"
    $("#loadmore").click((event) => {
        $("#loadmore").attr("disabled", true)
        getNext()
        event.preventDefault()
    })
    $(document).scroll(() => {
        if (($(document).height() - $(window).height()) - $(document).scrollTop() < 200 && !$("#loadmore").attr("disabled")) {
            $("#loadmore").click()
        }
    })
    function getNext() {
        JWT.ajax({
            type: "GET",
            url: nextUrl,
            data: ""
        }).done((data) => {
            $("#loadmore").attr("disabled", false)
            console.log(data)
            nextUrl = data.next
            const results = data.results
            $(".loading").hide()
            for (var i = 0; i < results.length; i++) {
                const result = results[i]
                const el_str = `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="float-right text-secondary">${new Date(result.created).toLocaleString()}</div>
                    <h5 class="card-title align-top">${result.author.username}</h5>
                    <p class="card-text content"></p>
                    ${window.localStorage.getItem("username") == result.author.username ? `<a href="diary_upsert.html?id=${result.id}&group=${groupID}" class="btn btn-primary float-right">編輯</a>` : ''}
                </div>
            </div>
                `
                $el = $(el_str)
                $el.find(".content").text(result.content)
                $el.find(".content").html($el.find(".content").html().replace(/\n/g, '<br>'))
                console.log($el.children(".content").length)
                $("#wrapper").append($el)

            }
        }).fail((data, _) => {
            // document.location.href = "login.html";
        })
    }
    getNext()
})
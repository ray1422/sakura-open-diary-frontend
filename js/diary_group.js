$(document).ready(() => {
    JWT.refresh()
    JWT.ajax({
        type: "GET",
        url: "/diary/group/",
        data: ""
    }).done((data) => {
        $("#diary_group_list").text('')
        for (var i = 0; i < data.length; i++) {
            let members_str = ""
            for (let j = data[i].members.length; j;) {
                members_str += data[i].members[j - 1].username
                if (--j) members_str += ", "
            }

            const el_str = `<a href="diary.html?id=${data[i].id}" class="list-group-item">\
                <h4 class="list-group-item-heading">${data[i].name}</h4>\
                <p class="list-group-item-text">${members_str}</p>\
            </a>`
            $("#diary_group_list").append($(el_str))

        }
    }).fail((data, _) => {
        document.location.href = "login.html";
    })

})
BASE_URL = "https://ray.jamex.me"
JWT = {
    token: null,
    refreshKey: null,
    setToken: (token) => {
        $.cookie('jwt', token, { expires: 28 });
        JWT.token = token
    },
    setRefresh: (refresh) => {
        $.cookie('refresh', refresh, { expires: 28 });
        JWT.refresh_key = refresh
    },
    ajax: (parm) => {
        if (!parm.headers) {
            parm.headers = {}
        }
        parm.headers.Authorization = "Bearer " + JWT.token
        if (parm.url[0] == "/")
            parm.url = BASE_URL + parm.url
        return $.ajax(parm)
    },
    refresh: () => {
        $.post({
            type: "POST",
            url: BASE_URL + "/api/auth/jwt/refresh",
            data: {
                'refresh': JWT.refreshKey
            }
        }).done((data) => {
            JWT.setToken(data.access)
        }).fail((data, _) => {
            window.location.href = "login.html"
            console.log(data)
        })
    }
}
JWT.token = $.cookie("jwt")
JWT.refreshKey = $.cookie("refresh")
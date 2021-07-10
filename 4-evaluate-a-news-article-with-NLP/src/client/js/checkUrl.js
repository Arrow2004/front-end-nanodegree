const check = (url) => {
    var pattern = new RegExp(
        /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i
    )
    return pattern.test(url) ? true : false
}

export { check }
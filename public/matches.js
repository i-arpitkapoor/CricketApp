const url = "http://cricapi.com/api/matches/?apikey=smb4waDvrmSEvArDYPlnmE4iDA73"

const getData = async () => {
    const response = await fetch(url)

    if(response.status === 200){
        const data = await response.json()
        console.log(data.matches)
        // const arr = data.matches
        // console.log('body', arr)
        console.log(data.matches[0].date)
        data.matches.forEach((match) => {
            // console.log(match)
            var eld = document.createElement("div")
            var el = document.createElement("a")
            var text = match["team-1"] + " vs " + match["team-2"]
            // var link = "http://cricapi.com/api/cricketScore/?apikey=smb4waDvrmSEvArDYPlnmE4iDA73&unique_id=" + match["unique_id"]
            var link = './score.html?unique_id=' + match["unique_id"] 
            el.setAttribute("href", link)
            el.setAttribute("class", "match")
            el.textContent = text
            eld.appendChild(el)
            el.setAttribute("class","card style")
            document.querySelector('body').appendChild(eld)
        })
        // document.querySelector('body').textContent = data.score + counter
        // counter = counter + 1
    } else {
        throw new Error('Unable to get data')
    }
}


getData()
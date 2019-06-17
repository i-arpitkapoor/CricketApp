var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("unique_id");
console.log(c);

const urll ='http://cricapi.com/api/cricketScore/?apikey=smb4waDvrmSEvArDYPlnmE4iDA73&unique_id=' + c

const getData = async () => {
    const response = await fetch(urll)

    if(response.status === 200){
        const data = await response.json()
        console.log(data.score)
        document.querySelector('h5').textContent = data.score
    } else {
        throw new Error('Unable to get data')
    }
}

//getData()

const timer = () => {
    setInterval(() => {
        getData()
    }, 2000)
}


timer()
export const fetchApi = (setState, apiSearch) => {
    const API = "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-"
    fetch(`${API}/${apiSearch}`)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setState({...data});
        })
}
export const formatDate = (date)=>{
    const time = new Date(date);
    var year    = time.getFullYear();
    var month   = ('0' + time.getMonth()).slice(-2);
    var day   = ('0' + time.getDay()).slice(-2);
    var hour    = time.getHours();
    var minute  = time.getMinutes();
    var seconds = time.getSeconds();
    return `${day}.${month}.${year}`
}
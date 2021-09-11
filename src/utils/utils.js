export const fetchApi = (setState, apiSearch) => {
    const API = "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-"
    fetch(`${API}/${apiSearch}`)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setState({...data});
        })
}
export const formatDate = ()=>{

}
const productApi  =async () =>{
    try{
    const url = '/api/user/'
    const response = await fetch(url);
    if(!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorMessage}`);
    }
    const data = await response.json();
    return data;

    }
    catch(err){
        console.log(err);
        return {};
    }



}

export default productApi;
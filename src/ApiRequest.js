const ApiRequest = async (url = '',optionsObject = null, errmsg = null) => {
  try{
    const fetchData = await fetch(url,optionsObject)
    if(!fetchData.ok) throw Error("Please reload the Application") 
  }
  catch(err){
    console.log(err.msg);
  }
  finally{
        return errmsg
  }
}

export default ApiRequest

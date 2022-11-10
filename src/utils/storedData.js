import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const getAccessToken = () => { return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVlOWU3ODdFNzUxMDg4NzYzOEZGM0JjM0Y2ZTcxQ0EzRDM3QUVDYTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjgwNDA4NzY1NjQsIm5hbWUiOiJqZXR2ZXJpZnkifQ.95GDrtp_BFL4c197WsgE6i7uJcO7FdwcQnRN-ey1Deg" }
const makeStorageClient = () => { return new Web3Storage({ token: getAccessToken() }) }
const client = makeStorageClient();
let url = ""

async function listUploads () {
  console.log("Listing uploads")
  const links = []
  for await (const upload of client.list()) {
    links.push(`${upload.cid}`)
  }
  return links
}

const fetchData = async (url) => {
  const data = await fetch(url)
  const res = await data.json()
  return res
}

const trimName = (name) => {
  let t_name = name.trim();
  if(t_name.includes(" ")) {
    t_name = t_name.replaceAll(" ", "%20");
  }
  console.log(t_name);
  return t_name;
}

const makeFileObjects = (file, file_name) => {
  const blob = new Blob([JSON.stringify(file)], { type: "application/json" })
  const files = [new File([blob], `${file_name}.json`)]

  return files
}

export const uploadUserInfo = async (info) => {
  const {} = info

  const data = JSON.stringify({
    ...info
  })

  try {
    console.log("sending...")
    const file_name = trimName(info.fullname);
    const files = makeFileObjects(data, info.fullname);
    const file_cid = await client.put(files);

    console.log("sent")
    url = `https://${file_cid}.ipfs.w3s.link/${file_name}.json`;
    console.log(url)

    listUploads()
  }catch(err) {
    console.log(err)
  }
}


export const verifyNin = async(docType, docId) =>{
  console.log("Loading...")
  let searchType;
  if(docType == "NIN") { searchType = "NIN-SEARCH" }
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      userid: '1668011372112',
      apiKey: 'DTHswgJl1K3roPN5FeVp',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      searchParameter: '02730846093',
      verificationType: searchType,
      transactionReference: ""
    })
  };

  try {
    console.log("Fetching...")
    const data = await fetch('https://api.verified.africa/sfx-verify/v3/id-service/', options)
    const result =  await data.json()
    // console.log(result.response[0])
    const { email, firstname, surname, gender} = result.response[0]
    const userData = {
      NINEmail: email,
      firstname,
      surname,
      gender
    }
    console.log(userData)
    return userData
  } catch(err) {
    console.log(err)
  } 
}

export const dataFromIPFS = async() => {
  const cids = await listUploads();
  const ipfsData = []
  // console.log(ipfsData)
  try {
    cids.forEach(async (cid) => {
      let data = await client.get(cid)
      let res = await data.files();
      // console.log(res)
      let fileUrl = `https://${res[0].cid}.ipfs.w3s.link`
      // console.log(fileUrl)
      let file = await fetchData(fileUrl)
      let x = JSON.parse(file)
      ipfsData.push(JSON.parse(file))
    })
    console.log(ipfsData)
    return ipfsData;
  }
  catch(error) {
    console.log(error)
  }
}
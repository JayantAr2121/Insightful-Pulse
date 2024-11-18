import React, { useRef, useState } from 'react'
import Fire from '../../Fire'
import { storage } from '../../Fire'
import { useNavigate } from 'react-router-dom'
const AddBlogComp = () => {
    var navigate=useNavigate()
    const [Obj, setObj] = useState({})
    const [inputs, setinputs] = useState([])
    const[btndisable,setbtndisable]=useState(false)
    const[loader,setloader]=useState(false)
    const [headingimage, setheadingimage] = useState(null)
    const [images, setimages] = useState([])
    const [imageserror, setimageserror] = useState(null)
    const image = useRef()
    const multipleimage = useRef()
    const Create = () => {
        setinputs(inputs => [...inputs, { id: inputs.length + 1 }])
    }
    const set1 = (event, Obj, index) => {
        const result = { ...Obj, [event.target.name]: event.target.value }
        inputs.splice(index, 1, result)
        setinputs([...inputs])
    }
    const set = (e) => {
        setObj({ ...Obj, [e.target.name]: e.target.value,"Date":Date.now() })
    }
    const radioCheck = (event) => {
        setObj({ ...Obj, "Status": event.target.id });
    }
    const upload = (event) => {
        const file = event.target.files[0]
        if (!file) return alert("Image is not uploaded yet.")
        const ext = file.type.split("/")
        if (ext[0] !== "image") return alert("Only Image is Supported")

        if (ext[1] === "png" || ext[1] === "jpg" || ext[1] === "jpeg" || ext[1] === "PNG") {
            return setheadingimage(file)
        }
        return alert("Only png,jpeg and jpg image is supported")
    }
    const uploads = (event) => {
        // alert("hii")
        const file = event.target.files
        if (!file) return alert("No Image is selected")

        if (file.length > 10) return alert("Only 10 images are allowed")

        var status = images
        var count = 0
        for (var i = 0; i < file.length; i++) {
            if (status.length > 9) {
                alert("Only 10 images are allowed")
                break;
            }
            const ext = file[i].type.split("/")
            if (ext[0] !== "image") {
                count++
            } else {
                if (ext[1] === "png" || ext[1] === "PNG" || ext[1] === "jpg" || ext[1] === "jpeg") {
                    status.push(file[i])
                } else {
                    count++
                }
            }
        }
        setimages([...status])
        setimageserror(count)

    }
    function Remove(index)
    {
        images.splice(index,1)
        setimages([...images])
    }
  async  function Submit(e){
        e.preventDefault()
        try{
            setloader(true)
            setbtndisable(true)
            if(!Obj.Title || !Obj.Heading || !Obj.Author || !Obj.Description|| !Obj.Category|| !Obj.Tags|| !Obj.Status) return alert("Field is Empty")

            if(!headingimage) return alert("Upload heading image first")
                
            let count=0
            for(let i=0;i<inputs.length;i++){
                if(!inputs[i].Sub_Heading || !inputs[i].Sub_Heading_Description){
                        count++
                    }
            }      
            if(count>0) return alert("Some Field are empty in Sub-Heading Part.")
            const user=JSON.parse(localStorage.getItem("Users"))
            if(!user){
                alert("Unauthorised user")
                window.history.replaceState(null,null,"/Login")
                return navigate("/",{replace:true})
            }
            
            const fileRef= storage.child(`jayant${headingimage.name}`)
            await fileRef.put(headingimage)
            const url=await fileRef.getDownloadURL()
            const path=fileRef.fullPath
            const headobj={url,path}
            let mydata={...Obj,"HeadingImage":headobj,"SubHeadingsData":inputs}
            
            if(images.length>0){
                let array=[]
                for(let j=0;j<images.length;j++){
                    // console.log(images[j].name)
                    // console.log()
                    const fileRefs= storage.child(`jayant${images[j].name}`)
                    await fileRefs.put(images[j])
                    const urls= await fileRefs.getDownloadURL()
                    const paths=fileRefs.fullPath 
                    array.push({urls,paths}) 
                }
                mydata={...mydata,"Images":array}
            }
            
            Fire.child("Blogs").child(user).push(mydata,err=>{
                if(err) return alert("Something went wrong. Try again later")
                else return alert("Blog Uploaded")
              })
              setTimeout(()=>navigate("/Blogs"),1500);
        }catch(error){
            return alert("Something Went Wrong. Try again later")
        }finally{
            setObj({})
            setheadingimage(null)
            setimages([])
            setinputs([]) 
            setbtndisable(false)
            setloader(false) 
        }
        
    }
    return (
        <div>
            <div className="checkout-wrap ptb-100">
                <div className="container">
                {
                loader && <div className='preloaders'><div className='loaders'></div></div>
                }
                    <div className="row">
                        <div className="col-xxl-8 col-xl-7 col-lg-7">
                            <form action="#" className="checkout-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3 className="checkout-box-title">Add You Blog</h3>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input value={Obj.Title ? Obj.Title : ""} onChange={set} type="text" name='Title' placeholder="Enter Title" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" value={Obj.Author ? Obj.Author : ""} onChange={set} name="Author" placeholder="Enter Author" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input name="Heading" value={Obj.Heading ? Obj.Heading : ""} onChange={set} id="Enter Heading" placeholder="Enter Heading" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea name="Description" value={Obj.Description ? Obj.Description : ""} onChange={set} placeholder='Enter Description' id=""></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Category" value={Obj.Category ? Obj.Category : ""} onChange={set} placeholder="Enter Category" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout-box" style={{ backgroundColor: 'transparent', padding: "0px" }} >
                                            <div className="checkout-details">
                                                <div className="bill-details">
                                                    <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "10px" }} className="select-payment-method mt-20">
                                                        <div>
                                                            <span style={{ fontSize: "20px" }}>Status:</span>
                                                        </div>
                                                        <div>
                                                            <input value={Obj.Status == "Active" ? true : false} onChange={radioCheck} type="radio" id="Active" name="radio-group" />
                                                            <label htmlFor="Active">Active</label>
                                                        </div>
                                                        <div>
                                                            <input value={Obj.Status == "InActive" ? true : false} onChange={radioCheck} type="radio" id="InActive" name="radio-group" />
                                                            <label htmlFor="InActive">In-Active</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" onChange={set} value={Obj.Tags ? Obj.Tags : ""} placeholder='Enter Tags' name="Tags" id="" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <a className="btn-two w-100 d-block" onClick={Create} style={{ height: "48px", padding: "9px" }}>Create Sub-Heading<i className="flaticon-right-arrow" /></a>
                                        </div>
                                    </div>
                                    {
                                        inputs.map(function (input, index) {
                                            return (
                                                <div className='row' key={index}>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" name="Sub_Heading" onChange={(e) => set1(e, input, index)} placeholder={`Enter the Sub Heading-${input.id}`} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" name="Sub_Heading_Description" onChange={(e) => set1(e, input, index)} placeholder={`Enter the Sub Heading Description-${input.id}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                     {
                                            imageserror?<p style={{fontSize:"20px",color:"red",textAlign:"center"}}>{imageserror+" files are not of image type."}</p>:""
                                    }
                                    <div className="col-lg-12 mt-4">
                                        <div className="form-group mb-0">
                                            <button type="button" disabled={btndisable} onClick={Submit} className="btn-one">Submit<i className="flaticon-right-arrow" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xxl-4 col-xl-5 col-lg-5">
                            <div className="sidebar">
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">Heading Image</h4>
                                    <div className="cart-total">
                                        <div className="cart-total-wrap">
                                            <img className='img-thumbnail' height={"100%"} width={"100%"} src={headingimage ? URL.createObjectURL(headingimage) : "assets/img/newsletter-bg.webp"} alt="" />
                                        </div>
                                        <input type="file" onChange={upload} accept='image/*' hidden ref={image} />
                                        <a className="btn-two w-100 d-block" onClick={() => image.current.click()}  >Upload Heading Image<i className="flaticon-right-arrow" /></a>
                                    </div>
                                </div>
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">Upload More Images</h4>
                                    <div className="checkout-details">
                                        {
                                            images.map(function (obj,index) {
                                                return (
                                                    <div key={index} className='myimages'>
                                                        <img src={obj?URL.createObjectURL(obj):"assets/img/newsletter-bg.webp"} alt="" />
                                                        <i onClick={()=>Remove(index)} >&times;</i>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="bill-details">
                                            <div className="checkout-footer mt-4">
                                                <input ref={multipleimage} multiple={true} onChange={uploads} accept='image/*' type="file" hidden />
                                                <button type="button" onClick={() => multipleimage.current.click()} className="btn-two d-block w-100 mt-10">Upload Images<i className="flaticon-right-arrow" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBlogComp
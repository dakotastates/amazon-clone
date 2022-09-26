import {useState} from "react"
import { storage } from '../firebase'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

function ImageUpload({setImage}) {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    // Handles input change event and updates state
    const handleChange = e => {
        setFile(e.target.files[0]);
    }

    const handleUpload = e =>{
      e.preventDefault()
      if (!file) {
          alert("Please choose a file first!")
      }

      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
          },
          (err) => console.log(err),
          () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setImage(url)
              });
          }
      );
    }

    return (
        <div>
          <input type="file" onChange={handleChange} accept="" />
          <button className='upload__btn' onClick={handleUpload}>Upload Image</button>
          {(percent != 0) ? <p>{percent} "% done"</p>: null}
        </div>
    );
}

export default ImageUpload;

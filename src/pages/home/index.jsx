import LOGO from "../../assets/airForShare-logo.svg";
import "./css/style.scss";
import { IoText } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import TEXT_GREY from "../../assets/text-grey .svg";
import TEXT_COLOR from "../../assets/text-color.svg";
import FILE_GREY from "../../assets/files-grey.svg";
import FILE_COLOR from "../../assets/files-color.svg";
import { useEffect, useState } from "react";
import TextArea from "../../components/TextArea";
import ThemeButton from "../../components/Button";
import DropZone from "../../components/DropZone";
import FilesList from "../../components/FilesList";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  database,
  ref,
  set,
  onValue,
  remove,
  storage,
  uploadBytesResumable,
  getDownloadURL,
  storageRef,
  deleteObject,
} from "../../db/fireabse.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function HomePage() {
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [isText, setIsText] = useState(false);
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    setTempFiles([...tempFiles, ...acceptedFiles]);
    let arr = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      arr.push(uploudFile(acceptedFiles[i], files.length + i));
    }
    const allFiles = await Promise.all(arr);
    setFiles([...files, ...allFiles]);
    set(ref(database, "file-sharing"), {
      files: [...files, ...allFiles],
    });
    setTempFiles([]);
  };

  const uploudFile = (file, i) => {
    return new Promise((resolve, reject) => {
      const fileRef = storageRef(storage, `files/file-${i}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ url: downloadURL, type: file.type, name: file.name });
          });
        }
      );
    });
  };

  const saveChanges = () => {
    set(ref(database, "text-sharing"), {
      text: textValue,
    });
  };

  const clearText = async () => {
    await remove(ref(database, "text-sharing"));
    setTextValue("");
    setIsText(false);
  };

  const deleteAllFiles = async () => {
    await remove(ref(database, "file-sharing"));
    await remove(ref(storage , "files/"))
    // Create a reference to the file to delete
    const desertRef = ref(storage, "files");
    
    // Delete the file
    await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      setFiles([]);
      console.log("deleted done")
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error, "<<---- err")
      });
  };

  const downloadAllFiles = () => {
    const filename = "All-Files";
    // const urls = files.map(v => v.url);
    const zip = new JSZip();
    const folder = zip.folder("project");
    files.forEach((file) => {
      const blobPromise = fetch(file.url).then(function (response) {
        console.log({ response });
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      });
      const name = file.name;
      folder.file(name, blobPromise);
    });

    zip
      .generateAsync({ type: "blob" })
      .then((blob) => saveAs(blob, filename))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const textRef = ref(database, "text-sharing");
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.text) {
        setTextValue(data.text);
        setIsText(true);
      }
    });

    const fileRef = ref(database, "file-sharing");
    onValue(fileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFiles(data.files);
      }
    });
  }, []);

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links = textValue.match(regex) || [];

  return (
    <div className="container">
      <div className="header-bar">
        <div className="logo">
          <img src={LOGO} alt="" />
        </div>
        <div className="menu-bar">
          <ul>
            <li>How it works </li>
            <li>Download</li>
            <li>Upgrade</li>
            <li>Feedback</li>
            <li className="menu-btn">Login / Register</li>
          </ul>
        </div>
      </div>

      <div className="main-card">
        <div className="card-sidebar">
          <div onClick={() => setType("text")}>
            <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
          </div>
          <div onClick={() => setType("files")}>
            <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
          </div>
        </div>
        <div className="card-container">
          {type === "text" ? (
            <div className="text-section">
              <h1>Text</h1>
              <div className="resize-section">
                <TextArea
                  value={textValue}
                  onChange={(e) => {
                    setTextValue(e.target.value);
                    setIsText(false);
                  }}
                />
              </div>
              <div className="text-footer">
                <div className="links">
                  {links.map((v, i) => (
                    <div key={i}>
                      <span>
                        <a href={v} target="_blank" rel="noopener noreferrer">
                          {v}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="save-btn-section">
                  <span onClick={clearText}>Clear</span>
                  {isText ? (
                    <ThemeButton
                      onClick={() => {
                        navigator.clipboard.writeText(textValue);
                      }}
                      tittle={"Copy"}
                    />
                  ) : (
                    <ThemeButton
                      onClick={saveChanges}
                      disabled={textValue ? false : true}
                      tittle={"save"}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="files-section">
              <div className="files-header">
                <h1>Files</h1>
                <div className="files-btn">
                  <div onClick={downloadAllFiles} className="download-btn">
                    <FaDownload />
                    Downloud All
                  </div>
                  <div onClick={deleteAllFiles} className="delete-btn">
                    <MdDelete />
                    Delete All
                  </div>
                </div>
              </div>
              {tempFiles.length || files.length ? (
                <FilesList
                  tempFiles={tempFiles}
                  onDrop={onDrop}
                  files={files}
                />
              ) : (
                <DropZone
                  onDrop={onDrop}
                  textElement={
                    <>
                      {" "}
                      Drag and drop any files up to 2 files, 5Mbs each or{" "}
                      <span> Browse Upgrade </span> to get more space
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

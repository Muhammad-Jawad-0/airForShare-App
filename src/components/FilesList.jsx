import { CiFileOn } from "react-icons/ci";
import "./index.scss";
import DropZone from "./DropZone";
import { GoPlus } from "react-icons/go";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import LOADER from "../assets/loader.gif";

function FilesList({ tempFiles, files, onDrop }) {
  return (
    <div className="file-list">
      {files.map((v, i) => {
        let icons;
        switch (v.type) {
          case "text/html":
            icons = <FaHtml5 />;
            break;
          case "text/css":
            icons = <FaCss3Alt />;
            break;
          case "text/javascript":
            icons = <IoLogoJavascript />;
            break;
          default:
            icons = <CiFileOn />;
        }

        return (
          <a key={i} href={v.url} download target="_blank">
            <div>
              {v.type.indexOf("image") !== -1 ? (
                <img
                  className="image-file"
                  width={100}
                  height={100}
                  src={v.url}
                  alt=""
                />
              ) : (
                <>
                  {icons}
                  <span className="files-name">
                    {v.name.slice(0, 10)}
                    <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                  </span>
                </>
              )}
            </div>
          </a>
        );
      })}

      {tempFiles.map((v, i) => {
        let icons;
        switch (v.type) {
          case "text/html":
            icons = <FaHtml5 />;
            break;
          case "text/css":
            icons = <FaCss3Alt />;
            break;
          case "text/javascript":
            icons = <IoLogoJavascript />;
            break;
          default:
            icons = <CiFileOn />;
        }

        return (
          <div className="temp-file" key={i}>
            {v.type.indexOf("image") !== -1 ? (
              <img
                className="image-file"
                width={100}
                height={100}
                src={URL.createObjectURL(v)}
                alt=""
              />
            ) : (
              <>
                {icons}
                <span className="files-name">
                  {v.name.slice(0, 10)}
                  <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                </span>
              </>
            )}
            <img className="upload-loader" src={LOADER} alt="" />
          </div>
        );
      })}

      <div>
        <DropZone
          onDrop={onDrop}
          textElement={
            <span className="add-more-files">
              <GoPlus />
              <p>Add File</p>
              <span>(upto 5 MB)</span>
            </span>
          }
        />
      </div>
    </div>
  );
}

export default FilesList;

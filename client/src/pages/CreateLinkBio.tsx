import "../styles/createlinkbio.scss";
import { useState } from "react";
import { useCreateLinkBio } from "../hooks/useCreateLinkbio";

interface link {
  url: string;
  name: string;
}

const CreateLinkBio = () => {
  const { createlinkbio } = useCreateLinkBio();

  const [photo, setPhoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [links, setLinks] = useState<link[]>([]);
  const [linkname, setLinkname] = useState<string>("");
  const [linkurl, setLinkurl] = useState<string>("");

   const handleClick = (e: any) => {
    e.preventDefault();
    if(!photo || ! name || !links){
      return 
    }
    createlinkbio(
      photo,
      name,
      links
    );
  };


  const addLink = (e: any) => {
    e.preventDefault();
    let newlink = { linkname, linkurl };
    setLinks((prev: any) => [newlink, ...prev]);
    setLinkurl("");
    setLinkname("");
    console.log(links);
  };

  return (
    <div className="createlinkbio">
      <div className="con"></div>
      <h1>create link bio</h1>
      <div className="photoupload">
        <h1>add picture</h1>
        <form>
          <input
            id="photoinput"
            name="photo"
            onChange={(e: any) => setPhoto(e.target.files[0])}
            type="file"
          />
        </form>
      </div>
      <div className="description">
        <h1>name</h1>
        <textarea
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        ></textarea>
      </div>
      <div className="about">
        <h1>add links</h1>
        <input
          onChange={(e: any) => setLinkname(e.target.value)}
          value={linkname}
          placeholder="link name"
        />
        <input
          onChange={(e: any) => setLinkurl(e.target.value)}
          value={linkurl}
          placeholder="link url"
        />
        <button onClick={addLink}>add link</button>
        <hr />
      </div>
      <button onClick={handleClick}>create portolio</button>
    </div>
  );
};

export default CreateLinkBio;
